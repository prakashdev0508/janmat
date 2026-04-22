"use client";

import { FormEvent, useMemo, useState } from "react";
import { AppNav } from "@/app/components/shared/AppNav";

type LeaderTypeSelection = "AUTO" | "MP" | "MLA";

type UploadResponse = {
  totalFiles?: number;
  totalRows?: number;
  importedCount?: number;
  errorCount?: number;
  errors?: string[];
  fileSummaries?: Array<{
    fileName: string;
    totalRows: number;
    importedCount: number;
    errorCount: number;
  }>;
  acceptedHeaders?: string[];
  error?: string;
};

export function LeadersUploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [leaderType, setLeaderType] = useState<LeaderTypeSelection>("AUTO");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);

  const canSubmit = useMemo(() => files.length > 0 && !isSubmitting, [files, isSubmitting]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (files.length === 0 || isSubmitting) {
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    if (leaderType !== "AUTO") {
      formData.append("defaultLeaderType", leaderType);
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/leaders/upload", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as UploadResponse;
      setResult(data);
    } catch {
      setResult({
        error: "Upload failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppNav active="home" />
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-20">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Upload Leaders CSV</h1>
          <p className="mt-2 text-sm text-slate-600">
            Upload your leaders dataset. If a party, state, or district is missing, it will
            be created automatically.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="leaders-csv" className="mb-2 block text-sm font-medium text-slate-700">
                CSV Files
              </label>
              <input
                id="leaders-csv"
                type="file"
                accept=".csv,text/csv"
                multiple
                onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-teal-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700"
                required
              />
              <p className="mt-2 text-xs text-slate-500">
                You can select and upload multiple CSV files in one go.
              </p>
            </div>

            <div>
              <label htmlFor="leader-type" className="mb-2 block text-sm font-medium text-slate-700">
                Leader Type
              </label>
              <select
                id="leader-type"
                value={leaderType}
                onChange={(event) => setLeaderType(event.target.value as LeaderTypeSelection)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <option value="AUTO">Auto from CSV</option>
                <option value="MP">MP</option>
                <option value="MLA">MLA</option>
              </select>
              <p className="mt-2 text-xs text-slate-500">
                Use MP/MLA to apply one type for rows where the CSV has no `leaderType`.
              </p>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Uploading..." : "Upload CSV"}
            </button>
          </form>

          {result && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
              {result.error ? (
                <p className="font-medium text-rose-600">{result.error}</p>
              ) : (
                <>
                  <p className="font-medium text-slate-900">
                    Imported {result.importedCount ?? 0} of {result.totalRows ?? 0} rows from{" "}
                    {result.totalFiles ?? 0} file(s).
                  </p>
                  <p className="mt-1 text-slate-600">Errors: {result.errorCount ?? 0}</p>

                  {result.fileSummaries && result.fileSummaries.length > 0 && (
                    <ul className="mt-3 space-y-1 text-slate-700">
                      {result.fileSummaries.map((summary) => (
                        <li key={summary.fileName}>
                          {summary.fileName}: imported {summary.importedCount}/{summary.totalRows},
                          errors {summary.errorCount}
                        </li>
                      ))}
                    </ul>
                  )}

                  {result.errors && result.errors.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-rose-600">
                      {result.errors.slice(0, 12).map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  )}

                  {result.acceptedHeaders && result.acceptedHeaders.length > 0 && (
                    <p className="mt-4 text-xs text-slate-500">
                      Supported headers: {result.acceptedHeaders.join(", ")}
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
