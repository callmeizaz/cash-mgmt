import React, { useMemo, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { Button, Grid, IconButton, MenuItem, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { useStyles } from './styles';
import UserDetailsWrapper from '../DetailsWrapper';
import TableWrapper from '../Table';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { doAsyncDeleteEmployee, doAsyncFetchEmployees } from '../../redux/thunks/employee';
import { useSnackbar } from 'notistack';
import PopoverWrapper from '../PopoverWrapper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { selectUserType } from '../../redux/selectors/authentication';
import { doAsyncRegisterEmployee } from '../../redux/thunks/authentication';

interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
}

const EmployeeTableComponent = () => {
  // hooks
  const classes = useStyles();
  const [employeeList, setEmployeeList] = useState([]);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [disabled, setDisabled] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const userType = useAppSelector(selectUserType);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData>({
    firstName: '',
    lastName: '',
    email: '',
    employeeId: '',
  });

  // fetch employees
  const fetchEmployees = useCallback(() => {
    dispatch(doAsyncFetchEmployees())
      .then((res) => {
        if (res.type === 'fetch/employee/fulfilled') {
          const { data } = res.payload;
          setEmployeeList(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchEmployees();

    // cleanup
    return () => fetchEmployees();
  }, [fetchEmployees]);

  const handleRemove = () => {
    if (!employeeId) return;
    setDisabled(true);
    dispatch(
      doAsyncDeleteEmployee({
        id: employeeId,
      }),
    ).then((res) => {
      if (res.type === 'delete/employee/fulfilled') {
        const { message } = res.payload;
        enqueueSnackbar(message, {
          variant: 'success',
          autoHideDuration: 1500,
        });
        fetchEmployees();
        setDisabled(false);
      }
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, data: any) => {
    const { id, name, email, eid } = data;
    const splitName = name.split(' ');

    const firstName = splitName[0];
    const lastName = splitName[splitName.length - 1];

    setEmployeeId(id);
    setSelectedEmployee({
      firstName,
      lastName,
      email,
      employeeId: eid,
    });
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEmployeeId(null);
    setSelectedEmployee({
      firstName: '',
      lastName: '',
      email: '',
      employeeId: '',
    });
  };

  // register employees

  const handleRegister = () => {
    if (userType !== 'admin') return;

    dispatch(
      doAsyncRegisterEmployee({
        ...selectedEmployee,
        userType: 'employee',
      }),
    )
      .then((res) => {
        if (res.type === 'auth/register/employee/fulfilled') {
          const { message } = res.payload;
          enqueueSnackbar(message, {
            variant: 'success',
            autoHideDuration: 1500,
          });

          handleClose();
        } else {
          enqueueSnackbar(res.payload, {
            variant: 'error',
            autoHideDuration: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(selectedEmployee);
  };

  const tableData = useMemo(
    () =>
      employeeList?.map((item: any) => {
        const { _id, address, email, firstName, lastName, employeeId, designation, salary, phone } =
          item;

        return {
          id: _id,
          address,
          name: firstName?.concat(' ', lastName),
          email,
          designation,
          salary,
          phone,
          eid: employeeId,
        };
      }),

    [employeeList],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
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
        Header: 'Address',
        accessor: 'address',
        disableSortBy: true,
        meta: {
          colSpan: 1.5,
        },
        Cell: ({ row }: any) => {
          const { address } = row?.original;
          return <Typography className="text-sm">{address}</Typography>;
        },
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
        disableSortBy: true,
      },
      {
        Header: 'Employee ID',
        accessor: 'eid',
        disableSortBy: true,
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
        Header: 'Salary',
        accessor: 'salary',
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
            <TextField
              inputProps={{
                className: classes.textField,
              }}
              size="small"
              name="name"
              placeholder={'Employee Name'}
            />
          </Grid>
          <Grid item className="mr-2">
            <TextField
              size="small"
              name="email"
              inputProps={{
                className: classes.textField,
              }}
              placeholder={'Employee Email'}
            />
          </Grid>
          <Grid item className="mr-2">
            <TextField
              size="small"
              name="eid"
              inputProps={{
                className: classes.textField,
              }}
              placeholder={'Employee ID'}
            />
          </Grid>
          <Grid item className="mr-2">
            <TextField
              size="small"
              name="phone"
              inputProps={{
                className: classes.textField,
              }}
              placeholder={'Phone Number'}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="small"
              fullWidth
              disableElevation
              className="py-1 h-10 rounded-md normal-case text-base"
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {/* buttons */}

        <Grid item className={clsx(classes.boxShadow, 'rounded-xl py-4  w-full ')}>
          <TableWrapper columnData={tableData} isLoading={loading} columns={columns} />
        </Grid>
      </Grid>

      <PopoverWrapper
        anchorEl={anchorEl}
        handleClose={handleClose}
        anchorPos={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem className="text-base hover:bg-lightCyan-400" onClick={handleRemove}>
          Delete
        </MenuItem>
        <MenuItem className="text-base hover:bg-lightCyan-400" onClick={handleRegister}>
          Register employee
        </MenuItem>
      </PopoverWrapper>
    </>
  );
};

export default EmployeeTableComponent;
