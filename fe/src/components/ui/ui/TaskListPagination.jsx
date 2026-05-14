import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TaskListPagination = ({
  handleNextPage,
  handlePrevPage,
  handlePageChange,
  page,
  totalPages,
}) => {
  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        pageNumbers.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pageNumbers;
  };

  const pageToShow = generatePageNumbers();

  return (
    <div className="flex flex-center mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePrevPage} />
          </PaginationItem>
          {pageToShow.map((pageNumber, idx) => (
            <PaginationItem key={idx}>
              {pageNumber === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={pageNumber === page}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
