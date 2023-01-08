import React from 'react';
// Table
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import { useTable, useSortBy } from 'react-table';
import { selectUserType } from '../../redux/selectors/authentication';
import { useAppSelector } from '../../redux/store';

interface IProps {
  columnData: any;
  columns: any;
  isLoading?: boolean;
}

const TableWrapper = (props: IProps) => {
  const userType = useAppSelector(selectUserType);

  // hooks
  const { columnData, columns, isLoading } = props;
  const initialState = { hiddenColumns: userType !== 'admin' ? ['action'] : [] };
  console.log(initialState);
  // @ts-ignore
  const tableInstance = useTable({ columns, data: columnData, initialState }, useSortBy);
  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } = tableInstance;
  return (
    <>
      <div {...getTableProps()} className="w-full table">
        <TableHeader headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
          rows={rows}
          loading={isLoading}
        />
      </div>
    </>
  );
};
export default TableWrapper;
