import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { Button, Card, Grid, IconButton, MenuItem, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';

import UserDetailsWrapper from '../DetailsWrapper';
import TableWrapper from '../Table';
import { styled } from '@mui/material/styles';

import _debounce from 'lodash/debounce';
import { isEmptyObj, searchResult } from '../../utils/helpers';
import {
  doAsyncApproveBill,
  doAsyncDeleteBill,
  doAsyncExportBill,
  doAsyncFetchBillById,
  doAsyncFetchBills,
  doAsyncFetchBillsBetweenDates,
  doAsyncRejectBill,
} from '../../redux/thunks/bill';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopoverWrapper from '../PopoverWrapper';
import { useSnackbar } from 'notistack';
import moment from 'moment';

import ClearIcon from '@mui/icons-material/Clear';
import { selectCurrentUser, selectUserType } from '../../redux/selectors/authentication';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    fontSize: '14px !important',
    color: theme.palette.primary.main,
  },
}));

const BillListComponent = () => {
  // hooks
  const [searchInput, setSearchInput] = useState<any>({
    name: '',
    email: '',
    phone: '',
  });
  const dispatch = useAppDispatch();
  const userType = useAppSelector(selectUserType);
  const { id: userId } = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [billId, setBillId] = useState<string | null>(null);
  const [billData, setBillData] = useState([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [isApproved, setIsApproved] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const onChangeRef = useRef(searchInput);
  const billRef = useRef(billData);

  const fetchBills = () => {
    setLoading(true);

    if (userType === 'employee') {
      dispatch(
        doAsyncFetchBillById({
          id: userId,
        }),
      ).then((res) => {
        if (res.type === 'bill/fetch/id/fulfilled') {
          const { data } = res.payload;
          setBillData(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

      return;
    }

    dispatch(doAsyncFetchBills())
      .then((res) => {
        if (res.type === 'bill/getBills/fulfilled') {
          const { data } = res.payload;
          setBillData(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBills();
    // cleanup
    return () => fetchBills();
  }, []);

  //   Tab handler
  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };

  const handleDateChange = (newValue: Date | null, type: string) => {
    if (type !== 'start') {
      setEndDate(newValue);
      return;
    }
    setStartDate(newValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, data: any) => {
    const { id, status } = data;
    setBillId(id);
    setIsApproved(status);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // BILL handler
  const handleDelete = () => {
    if (!billId) return;

    dispatch(
      doAsyncDeleteBill({
        id: billId,
      }),
    ).then((res) => {
      if (res.type === 'bill/delete/fulfilled') {
        const { message } = res.payload;
        enqueueSnackbar(message, {
          variant: 'success',
          autoHideDuration: 1500,
        });
        fetchBills();
      }
    });
  };

  const handleApprove = () => {
    if (!billId) return;

    dispatch(
      doAsyncApproveBill({
        id: billId,
      }),
    ).then((res) => {
      if (res.type === 'bill/approved/fulfilled') {
        const { message } = res.payload;
        enqueueSnackbar(message, {
          variant: 'success',
          autoHideDuration: 1500,
        });
        fetchBills();
      }
    });
  };

  const handleReject = () => {
    if (!billId) return;

    dispatch(
      doAsyncRejectBill({
        id: billId,
      }),
    ).then((res) => {
      if (res.type === 'bill/reject/fulfilled') {
        const { message } = res.payload;
        enqueueSnackbar(message, {
          variant: 'success',
          autoHideDuration: 1500,
        });
        fetchBills();
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const isEmpty = isEmptyObj(searchInput);

    if (!!value || !isEmpty) {
      onChangeRef.current = { ...onChangeRef.current, [name]: value };

      setSearchInput((prev: any) => ({ ...prev, [name]: value }));

      handleSearch();
    } else {
      setSearchInput(null);
      onChangeRef.current = null;
    }
  };

  const debounceVal = useCallback(
    _debounce((e) => {
      handleChange(e);
    }, 300),
    [],
  );

  const handleSearch = () => {
    const input = { ...onChangeRef.current };
    const consentList = [...billRef.current];

    if (!isEmptyObj(input) && input && consentList.length) {
      const result = searchResult(consentList, input);

      if (result.length) {
        setBillData(result);
      } else {
        setBillData([]);
      }
    }
  };

  // GET FILTERED BILLS
  const handleFilter = () => {
    if (!startDate || !endDate) return;

    dispatch(doAsyncFetchBillsBetweenDates({ startDate, endDate }))
      .then((res) => {
        if (res.type === 'bill/getMultipleBills/fulfilled') {
          const { data } = res.payload;
          if (data?.length) {
            setBillData(data);
          } else {
            enqueueSnackbar('No bill available', {
              variant: 'warning',
              autoHideDuration: 1500,
            });
          }
        }
      })
      .catch((err) => {
        console.log('this is the error', err);
      });
  };

  const handleExport = () => {
    setDisabled(true);
    dispatch(doAsyncExportBill()).then((res) => {
      if (res.type === 'bill/export/fulfilled') {
        const { path, message } = res.payload;

        enqueueSnackbar(`${message} at ${path}`, {
          variant: 'success',
          autoHideDuration: 5000,
        });
        setDisabled(false);
      } else {
        setDisabled(false);
      }
    });
  };

  // TABLE DATA
  const tableData = useMemo(
    () =>
      billData.map((item: any) => {
        const {
          _id,
          uploadedBy: { firstName, lastName, email, designation, phone },
          amount,
          createdAt,
          approved,
        } = item;

        return {
          id: _id,
          name: firstName.concat(' ', lastName),
          profile: '',
          designation,
          email: email.toLowerCase(),
          phone,
          status: approved,
          amount,
          uploaded: moment(createdAt).format('DD/MM/YYYY'),
          action: '',
        };
      }),

    [billData],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Employee',
        accessor: 'name',
        meta: {
          colSpan: 2,
        },
        Cell: ({ row }: any) => {
          const { name, email, profile } = row?.original;
          return <UserDetailsWrapper name={name} url={profile} email={email} />;
        },
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
        disableSortBy: true,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Designation',
        accessor: 'designation',
        disableSortBy: true,
        meta: {
          colSpan: 1.5,
        },
      },
      {
        Header: 'Uploaded At',
        accessor: 'uploaded',
        disableSortBy: true,
      },
      {
        Header: 'Status',
        accessor: 'status',

        Cell: ({ row }: any) => {
          const { status } = row?.original;
          return (
            <>
              <Typography sx={{ color: status ? '#2EC234' : 'red' }}>
                {status ? 'approved' : 'declined'}
              </Typography>
            </>
          );
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableSortBy: true,

        Cell: ({ row }: any) => {
          return (
            <IconButton onClick={(e) => handleClick(e, row?.original)}>
              <MoreVertIcon />
            </IconButton>
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Grid container>
        {/* search */}
        <Grid item container alignItems="center" className="mb-4">
          <Grid item className="mr-2">
            <StyledTextField size="small" name="name" onChange={debounceVal} placeholder={'Name'} />
          </Grid>
          <Grid item className="mr-2">
            <StyledTextField
              size="small"
              name="email"
              onChange={debounceVal}
              placeholder={'Email'}
            />
          </Grid>

          <Grid item className="mr-2">
            <StyledTextField
              size="small"
              name="phone"
              onChange={debounceVal}
              placeholder={'Phone Number'}
            />
          </Grid>

          <Grid item>
            <Button
              color="primary"
              variant="contained"
              size="medium"
              fullWidth
              onClick={handleSearch}
              disableElevation
              className="py-1 h-10 rounded-md normal-case text-base"
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {/* buttons */}

        {/* right buttons */}
        <Grid item container alignItems="center" justifyContent="space-between" className="mb-4">
          <Grid item xs={8} container alignItems="center">
            <Grid item>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/yyyy"
                  value={startDate}
                  onChange={(e) => handleDateChange(e, 'start')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item className="mx-2">
              <Typography>To</Typography>
            </Grid>

            <Grid item className="mr-2">
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                  label="End Date"
                  inputFormat="MM/DD/yyyy"
                  value={endDate}
                  disabled={!startDate}
                  minDate={startDate}
                  onChange={(e) => handleDateChange(e, 'end')}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={1}>
              <Button
                size="small"
                className="rounded-lg normal-case text-base"
                color="primary"
                onClick={handleFilter}
                fullWidth
              >
                Filter
              </Button>
            </Grid>
            {startDate && (
              <Grid item className="ml-2">
                <Button
                  onClick={() => {
                    setStartDate(null);
                    setEndDate(null);
                    fetchBills();
                  }}
                  variant="outlined"
                  className="rounded-lg"
                  endIcon={<ClearIcon />}
                >
                  Clear
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid item>
            <Button
              disabled={userType !== 'admin' || disabled}
              size="small"
              className="rounded-lg normal-case text-base"
              color="primary"
              onClick={handleExport}
            >
              Export Bills
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Card className="rounded-xl py-4">
            <TableWrapper columnData={tableData} columns={columns} isLoading={loading} />
          </Card>
        </Grid>
      </Grid>

      <PopoverWrapper
        anchorEl={anchorEl}
        handleClose={handleClose}
        anchorPos={{ vertical: 'top', horizontal: 'left' }}
      >
        {!isApproved ? (
          <MenuItem onClick={handleApprove} className="text-base  hover:bg-lightCyan-400 ">
            Approve
          </MenuItem>
        ) : (
          <MenuItem onClick={handleReject} className="text-base  hover:bg-lightCyan-400 ">
            Reject
          </MenuItem>
        )}

        <MenuItem className="text-base hover:bg-lightCyan-400" onClick={handleDelete}>
          Delete
        </MenuItem>
      </PopoverWrapper>
    </>
  );
};

export default BillListComponent;
