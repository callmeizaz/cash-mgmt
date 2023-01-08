import React from 'react';
import clsx from 'clsx';

import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { IProps } from './interface';
import { Typography } from '@mui/material';
import { useStyles } from '../styles';

// import useStyles from "./styles";

const TableBody = (props: IProps) => {
  const classes = useStyles();
  const { getTableBodyProps, rows, prepareRow, onClickHandler, height, loading } = props;

  return (
    <div
      className={clsx('table-row-group', onClickHandler ? 'cursor-pointer' : '')}
      {...getTableBodyProps()}
    >
      {!rows.length && !loading ? (
        <Typography className="p-2 text-sm text-custom-gray-400">No data available</Typography>
      ) : !loading ? (
        // Loop over the table rows

        rows.map((row, idx) => {
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <div
              key={idx}
              className={clsx('table-row')}
              {...row.getRowProps()}
              onClick={
                onClickHandler
                  ? () => {
                      onClickHandler(row.original);
                    }
                  : () => {}
              }
            >
              {
                // Loop over the rows cells
                row.cells.map((cell, index) => {
                  // Apply the cell props
                  return (
                    <div
                      key={index}
                      className={clsx('table-cell align-middle ')}
                      {...cell.getCellProps()}
                      // @ts-ignore
                    >
                      <div
                        className={clsx(
                          cell?.column?.meta?.height ? classes.biggerTable : classes.body,
                          `py-1 border-b-2 ${cell?.column?.meta?.height ? 'h-28' : ''}`,
                        )}
                      >
                        <Grid
                          // elevation={0}
                          className={clsx('text-base  ')}
                          container
                          justifyContent={
                            // @ts-ignore
                            cell.column?.meta?.justify || 'flex-start'
                          }
                          alignContent="center"
                          style={{ height: `${height} !important` }}
                        >
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </Grid>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          );
        })
      ) : (
        <Grid container alignItems="center" className="px-4 py-2">
          <CircularProgress size={'1.2rem'} color="primary" />
        </Grid>
      )}
    </div>
  );
};

export default TableBody;
