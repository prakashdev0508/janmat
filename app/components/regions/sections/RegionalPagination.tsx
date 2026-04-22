import { ChevronLeft, ChevronRight } from "lucide-react";

type RegionalPaginationProps = {
  page: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};

function buildPages(page: number, totalPages: number): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", page - 1, page, page + 1, "...", totalPages];
}

export function RegionalPagination({
  page,
  totalPages,
  isLoading = false,
  onPageChange,
}: RegionalPaginationProps) {
  if (isLoading) {
    return (
      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="h-10 w-72 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      </div>
    );
  }

  if (totalPages <= 1) {
    return null;
  }

  const pages = buildPages(page, totalPages);

  return (
    <div className="mt-16 flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition-all hover:border-teal-400 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((entry, index) =>
          entry === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={entry}
              onClick={() => onPageChange(entry)}
              className={
                entry === page
                  ? "h-10 w-10 rounded-xl bg-teal-600 text-sm font-bold text-white shadow-md"
                  : "h-10 w-10 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition-all hover:border-teal-400 hover:text-teal-600"
              }
            >
              {entry}
            </button>
          ),
        )}
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition-all hover:border-teal-400 hover:text-teal-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm font-bold text-slate-400">
        Page {page} of {totalPages}
      </p>
    </div>
  );
}
