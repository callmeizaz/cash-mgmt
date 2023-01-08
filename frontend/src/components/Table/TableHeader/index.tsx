/* eslint-disable react/jsx-key */
import React from 'react';
import clsx from 'clsx';

import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { IProps } from './interface';
import { useStyles } from '../styles';

const TableHeader = (props: IProps) => {
  const classes = useStyles();
  const { headerGroups } = props;
  return (
    <div className={clsx('table-header-group sticky top-0 py-4', classes.header)}>
      {
        // Loop over the header rows
        headerGroups.map((headerGroup) => {
          // Apply the header row props
          const columns = headerGroup.headers.reduce(
            (accumulator, currentValue) =>
              accumulator + (currentValue?.meta?.colSpan ? currentValue?.meta?.colSpan : 1),
            0,
          );

          const columnWidth = 100 / columns;

          return (
            <div {...headerGroup.getHeaderGroupProps()} className="table-row" key="1">
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, index) => {
                  return (
                    // Apply the header cell props
                    <div
                      className={clsx(
                        'table-cell px-2 align-middle h-10 border-b-2',
                        column.canSort ? 'cursor-pointer' : '',
                      )}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      // colSpan={column?.colSpan}
                      // @ts-ignore
                      style={{
                        width: `${
                          column?.meta?.colSpan ? column?.meta?.colSpan * columnWidth : columnWidth
                        }%`,
                      }}
                    >
                      <Typography
                        // @ts-ignore
                        align={column?.meta?.align || 'left'}
                        className={clsx(' font-bold text-sm')}
                        variant="subtitle1"
                      >
                        {
                          // Render the header
                          column.render('Header')
                        }
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDownwardIcon className="ml-2 mb-1 text-base" />
                          ) : (
                            <ArrowUpwardIcon className="ml-2 mb-1 text-base" />
                          )
                        ) : (
                          ''
                        )}
                      </Typography>
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default TableHeader;
