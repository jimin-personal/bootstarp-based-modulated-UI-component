import React from 'react';
import useResponsive from '@/hooks/useResponsive';

interface DefaultTableProps {
    columns: { key: string; title: string; colSpanValue?: number }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: { [key: string]: any }[];
    sumRow?: React.ReactNode;
}

const DefaultTable: React.FC<DefaultTableProps> = ({ columns, rows, sumRow }) => {
    const { isMobile } = useResponsive();
    return (
        <div className="leaderboard__wrapper">
            <div className="table-responsive">
                <table
                    className="table-borderless leaderboard__table default-table"
                    style={{ width: '100%', tableLayout: `${isMobile ? 'auto' : 'fixed'}` }}
                >
                    <thead>
                        <tr>
                            {columns.map((column) => {
                                return (
                                    <th
                                        scope="col"
                                        colSpan={column.colSpanValue}
                                        key={column.key}
                                        className="text-nowrap"
                                    >
                                        {column.title}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((contents, contentsIndex) => {
                            return (
                                // eslint-disable-next-line react/no-array-index-key
                                <tr className="leaderboard__item text-nowrap" key={contentsIndex}>
                                    {columns.map((column) => {
                                        return <td key={column.key}>{contents[column.key]}</td>;
                                    })}
                                </tr>
                            );
                        })}
                        {sumRow}
                    </tbody>
                    {/* {summaryRowName} */}
                </table>
            </div>
        </div>
    );
};

export default DefaultTable;
