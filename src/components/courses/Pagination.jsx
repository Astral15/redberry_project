function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...",totalPages];
}

function PaginationButton({
  children,
  active = false,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-[2.08vw] w-[2.08vw] items-center justify-center rounded-[0.21vw] border text-[0.82vw] transition-colors ${
        active
          ? "border-[#4F46E5] bg-[#4F46E5] text-white"
          : disabled
          ? "border-[#e5e5e5] bg-white text-[#c3c3c3]"
          : "border-[#e5e5e5] bg-white text-[#6f6f6f] hover:border-[#cfcafc] hover:bg-[#f6f5ff] hover:text-[#4F46E5]"
      }`}
    >
      {children}
    </button>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center gap-[0.42vw]">
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        ←
      </PaginationButton>

      {pages.map((page, index) =>
        page === "..." ? (
          <PaginationButton key={`dots-${index}`}>...</PaginationButton>
        ) : (
          <PaginationButton
            key={page}
            active={currentPage === page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PaginationButton>
        )
      )}

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        →
      </PaginationButton>
    </div>
  );
}