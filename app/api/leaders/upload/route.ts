import { LeaderType } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type CsvRow = Record<string, string>;

type ParseResult = {
  headers: string[];
  rows: CsvRow[];
};

type FileSummary = {
  fileName: string;
  totalRows: number;
  importedCount: number;
  errorCount: number;
};

const LEADER_TYPE_ALIASES = ["leadertype", "type"];
const NAME_ALIASES = [
  "name",
  "leadername",
  "leader_name",
  "mlaname",
  "mpname",
  "nameofmla",
  "nameofmp",
  "membername",
  "memberofparliament",
  "mp",
];
const PARTY_ALIASES = [
  "party",
  "partyname",
  "party_name",
  "partyaffiliation",
  "politicalparty",
];
const PARTY_SHORT_NAME_ALIASES = ["partyshortname", "party_short_name"];
const STATE_ALIASES = ["state", "statename", "state_name", "stateut", "stateorut"];
const DISTRICT_ALIASES = ["district", "districtname", "district_name"];
const GENDER_ALIASES = ["gender"];
const AGE_ALIASES = ["age"];
const EDUCATION_ALIASES = ["education"];
const CONSTITUENCY_ALIASES = [
  "constituency",
  "constituencyname",
  "parliamentaryconstituency",
  "pcname",
  "constituencynoandname",
];
const TERM_START_ALIASES = ["termstart", "term_start"];
const TERM_END_ALIASES = ["termend", "term_end"];
const DEBATES_ALIASES = ["debates", "numberofdebates", "debatesparticipated", "noofdebates"];
const QUESTIONS_ALIASES = [
  "questions",
  "questionsasked",
  "numberofquestions",
  "noofquestions",
];
const ATTENDANCE_ALIASES = ["attendance", "attendancepercentage", "attendancepercent"];

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

function parseCsv(content: string): ParseResult {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let insideQuotes = false;

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    const next = content[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  const nonEmptyRows = rows.filter((line) =>
    line.some((cell) => cell.trim().length > 0),
  );

  if (nonEmptyRows.length === 0) {
    return { headers: [], rows: [] };
  }

  const [headerRow, ...dataRows] = nonEmptyRows;
  const headers = headerRow.map((h) => h.trim());

  const mappedRows = dataRows.map((cells) => {
    const rowObject: CsvRow = {};
    headers.forEach((header, index) => {
      rowObject[header] = (cells[index] ?? "").trim();
    });
    return rowObject;
  });

  return { headers, rows: mappedRows };
}

function getValue(row: CsvRow, aliases: string[]): string | undefined {
  const entries = Object.entries(row);
  for (const [key, value] of entries) {
    const normalizedKey = normalizeHeader(key);
    if (aliases.includes(normalizedKey)) {
      return value?.trim();
    }
  }
  return undefined;
}

function findHeaderByHints(headers: string[], hints: string[]): string | undefined {
  const normalizedHeaders = headers.map(normalizeHeader);
  for (let index = 0; index < normalizedHeaders.length; index += 1) {
    const header = normalizedHeaders[index];
    if (hints.some((hint) => header.includes(hint))) {
      return headers[index];
    }
  }
  return undefined;
}

function getValueWithHints(
  row: CsvRow,
  aliases: string[],
  hints: string[],
): string | undefined {
  const directValue = getValue(row, aliases);
  if (directValue) {
    return directValue;
  }
  const hintedHeader = findHeaderByHints(Object.keys(row), hints);
  if (!hintedHeader) {
    return undefined;
  }
  const hintedValue = row[hintedHeader];
  return hintedValue?.trim();
}

function parseLeaderType(value?: string): LeaderType | null {
  if (!value) {
    return null;
  }
  const normalized = value.trim().toUpperCase();
  if (normalized === LeaderType.MP) {
    return LeaderType.MP;
  }
  if (normalized === LeaderType.MLA) {
    return LeaderType.MLA;
  }
  return null;
}

function parseInteger(value?: string): number | null {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseFloatValue(value?: string): number | null {
  if (!value) return null;
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseDate(value?: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

async function findOrCreateParty(name: string, shortName?: string): Promise<string> {
  const existing = await prisma.party.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });
  if (existing) return existing.id;

  const created = await prisma.party.create({
    data: {
      name,
      shortName: shortName || null,
    },
  });
  return created.id;
}

async function findOrCreateState(name: string): Promise<string> {
  const existing = await prisma.state.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });
  if (existing) return existing.id;

  const created = await prisma.state.create({
    data: { name },
  });
  return created.id;
}

async function findOrCreateDistrict(name: string, stateId: string): Promise<string> {
  const existing = await prisma.district.findFirst({
    where: {
      stateId,
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });
  if (existing) return existing.id;

  const created = await prisma.district.create({
    data: {
      name,
      stateId,
    },
  });
  return created.id;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const multiFiles = formData.getAll("files").filter((item): item is File => item instanceof File);
    const singleFile = formData.get("file");
    const files =
      multiFiles.length > 0
        ? multiFiles
        : singleFile instanceof File
          ? [singleFile]
          : [];
    const defaultLeaderTypeValue = formData.get("defaultLeaderType");
    const defaultLeaderType =
      typeof defaultLeaderTypeValue === "string"
        ? parseLeaderType(defaultLeaderTypeValue)
        : null;

    if (files.length === 0) {
      return NextResponse.json(
        { error: "Please upload at least one CSV file in `files`." },
        { status: 400 },
      );
    }

    const errors: string[] = [];
    const fileSummaries: FileSummary[] = [];
    let totalRows = 0;
    let importedCount = 0;

    for (const file of files) {
      const text = await file.text();
      const { headers, rows } = parseCsv(text);
      const fileSummary: FileSummary = {
        fileName: file.name,
        totalRows: rows.length,
        importedCount: 0,
        errorCount: 0,
      };

      if (rows.length === 0) {
        errors.push(`${file.name}: CSV file is empty or invalid.`);
        fileSummary.errorCount += 1;
        fileSummaries.push(fileSummary);
        continue;
      }

      const normalizedHeaders = headers.map(normalizeHeader);
      const requiredHeaderGroups: Array<{ label: string; aliases: string[]; hints: string[] }> = [
        { label: "name", aliases: NAME_ALIASES, hints: ["name", "mp", "mla", "member"] },
        { label: "party", aliases: PARTY_ALIASES, hints: ["party"] },
        { label: "state", aliases: STATE_ALIASES, hints: ["state", "ut"] },
      ];
      const missingRequired = requiredHeaderGroups
        .filter(
          (group) =>
            !group.aliases.some((alias) => normalizedHeaders.includes(alias)) &&
            !normalizedHeaders.some((header) =>
              group.hints.some((hint) => header.includes(hint)),
            ),
        )
        .map((group) => group.label);

      if (missingRequired.length > 0) {
        errors.push(`${file.name}: Missing required CSV headers: ${missingRequired.join(", ")}`);
        fileSummary.errorCount += 1;
        fileSummaries.push(fileSummary);
        continue;
      }

      totalRows += rows.length;

      for (let index = 0; index < rows.length; index += 1) {
        const row = rows[index];
        const rowNumber = index + 2;

        const name = getValueWithHints(row, NAME_ALIASES, ["name", "mp", "mla", "member"]);
        const partyName = getValueWithHints(row, PARTY_ALIASES, ["party"]);
        const partyShortName = getValue(row, PARTY_SHORT_NAME_ALIASES);
        const stateName = getValueWithHints(row, STATE_ALIASES, ["state", "ut"]);
        const districtName = getValueWithHints(row, DISTRICT_ALIASES, ["district"]);
        const rowLeaderType =
          parseLeaderType(getValue(row, LEADER_TYPE_ALIASES)) ?? defaultLeaderType;

        if (!name || !partyName || !stateName || !rowLeaderType) {
          errors.push(
            `${file.name} row ${rowNumber}: name, party, state and leaderType are required.`,
          );
          fileSummary.errorCount += 1;
          continue;
        }

        try {
          const [partyId, stateId] = await Promise.all([
            findOrCreateParty(partyName, partyShortName),
            findOrCreateState(stateName),
          ]);

          if (districtName) {
            await findOrCreateDistrict(districtName, stateId);
          }

          const existingLeader = await prisma.leader.findFirst({
            where: {
              name: {
                equals: name,
                mode: "insensitive",
              },
              type: rowLeaderType,
              constituency: getValue(row, CONSTITUENCY_ALIASES) || null,
            },
          });

          const leaderData = {
            name,
            type: rowLeaderType,
            partyId,
            stateId,
            gender: getValue(row, GENDER_ALIASES) || null,
            age: parseInteger(getValue(row, AGE_ALIASES)),
            education: getValue(row, EDUCATION_ALIASES) || null,
            constituency: getValue(row, CONSTITUENCY_ALIASES) || null,
            termStart: parseDate(getValue(row, TERM_START_ALIASES)),
            termEnd: parseDate(getValue(row, TERM_END_ALIASES)),
            debates: parseInteger(getValue(row, DEBATES_ALIASES)),
            questions: parseInteger(getValue(row, QUESTIONS_ALIASES)),
            attendance: parseFloatValue(getValue(row, ATTENDANCE_ALIASES)),
          };

          const savedLeader = existingLeader
            ? await prisma.leader.update({
              where: { id: existingLeader.id },
              data: leaderData,
              select: { id: true },
            })
            : await prisma.leader.create({
              data: leaderData,
              select: { id: true },
            });

          await prisma.leaderVoteSummary.upsert({
            where: { leaderId: savedLeader.id },
            create: { leaderId: savedLeader.id },
            update: {},
          });

          importedCount += 1;
          fileSummary.importedCount += 1;
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          errors.push(`${file.name} row ${rowNumber}: ${message}`);
          fileSummary.errorCount += 1;
        }
      }

      fileSummaries.push(fileSummary);
    }

    return NextResponse.json({
      totalFiles: files.length,
      totalRows,
      importedCount,
      errorCount: errors.length,
      errors,
      fileSummaries,
      acceptedHeaders: [
        "name / leaderName",
        "leaderType / type",
        "party / partyName",
        "partyShortName",
        "state / stateName",
        "district / districtName",
        "gender",
        "age",
        "education",
        "constituency",
        "termStart",
        "termEnd",
        "debates",
        "questions",
        "attendance",
      ],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
