import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getVisiblePages } from "../../utils/paginationHelper";
import PaginationButton from "./PaginationButton";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages <= 1) {
        return null;
    }

    const visiblePages = getVisiblePages(
        currentPage,
        totalPages
    );

    return (
        <nav className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-2">
            <PaginationButton
                circle={false}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}>
                <FiChevronLeft className="h-5 w-5" />
            </PaginationButton>

            {visiblePages.map((page, index) => {
                if (page === "...") {
                    return (
                        <span className="
                        flex
                        h-10
                        items-center
                        px-1
                        text-lg
                        font-medium
                        select-none
                        text-gray-400
                        dark:text-gray-500"
                        key={`ellipsis-${index}`}>
                        &hellip;
                        </span>
                    );
                }

                return (
                    <PaginationButton
                        key={page}
                        circle
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </PaginationButton>
                );
            })}

            <PaginationButton
                circle={false}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <FiChevronRight className="h-5 w-5" />
            </PaginationButton>
        </nav>
    );
}