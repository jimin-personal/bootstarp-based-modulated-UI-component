import { Pagination } from 'react-bootstrap';
import React from 'react';

const PaginationC: React.FC<{
    itemCount: number;
    itemsPerPage: number;
    pageRange: number;
    page: number;
    setPage: (page: number) => void;
}> = ({ itemCount, itemsPerPage, pageRange, page, setPage }) => {
    const pageCount = Math.ceil(itemCount / itemsPerPage);

    // 현재 페이지 주변의 페이지 범위 계산
    const startPage = Math.max(1, Math.min(page - Math.floor(pageRange / 2), pageCount - pageRange + 1));
    const endPage = Math.min(pageCount, startPage + pageRange - 1);

    const pages = Array.from({ length: endPage - startPage + 1 }).map((_, i) => startPage + i);

    return (
        <Pagination className="mt-5 justify-content-center d-flex flex-wrap">
            <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1}>
                <i className="fa-solid fa-angle-left" />
            </Pagination.Prev>
            {pages.map((pageNumber) => (
                <Pagination.Item key={pageNumber} onClick={() => setPage(pageNumber)} active={page === pageNumber}>
                    {pageNumber}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === pageCount}>
                <i className="fa-solid fa-angle-right" />
            </Pagination.Next>
        </Pagination>
    );
};

export default PaginationC;
