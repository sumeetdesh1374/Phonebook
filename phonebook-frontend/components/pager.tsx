import Link from 'next/link';

interface PagerProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  apiEndpoint: string;
  queryParams?: Record<string, string | number>;
}

export default function Pager({
  currentPage,
  pageSize,
  totalCount,
  apiEndpoint,
  queryParams = {},
}: PagerProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const buildUrl = (page: number): string => {
    const params = new URLSearchParams();
    params.set('pageNumber', page.toString());
    params.set('pageSize', pageSize.toString());

    // Add any additional query parameters
    Object.entries(queryParams).forEach(([key, value]) => {
      params.set(key, value.toString());
    });

    return `${apiEndpoint}?${params.toString()}`;
  };

  const getPageNumbers = (): (number | string)[] => {
    const delta = 2; // Number of pages to show around current page
    const range: (number | string)[] = [];

    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    // Always show first page
    if (start > 1) {
      range.push(1);
      if (start > 2) {
        range.push('...');
      }
    }

    // Show page range around current page
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Always show last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        range.push('...');
      }
      range.push(totalPages);
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-2 py-6"
      aria-label="Pagination Navigation"
    >
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Previous
        </Link>
      ) : (
        <button
          disabled
          className="rounded border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed"
        >
          Previous
        </button>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-slate-500"
            >
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isCurrentPage = pageNum === currentPage;

        return isCurrentPage ? (
          <button
            key={pageNum}
            disabled
            className="rounded border border-blue-500 bg-blue-500 px-3 py-2 text-sm font-medium text-white cursor-not-allowed"
          >
            {pageNum}
          </button>
        ) : (
          <Link
            key={pageNum}
            href={buildUrl(pageNum)}
            className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {pageNum}
          </Link>
        );
      })}

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Next
        </Link>
      ) : (
        <button
          disabled
          className="rounded border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed"
        >
          Next
        </button>
      )}

      {/* Page info */}
      <span className="ml-4 text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>
    </nav>
  );
}
