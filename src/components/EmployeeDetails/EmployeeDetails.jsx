import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MaterialTable from '@material-table/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import { fetchEmployees, addEmployee } from '../../api/employee';
import './EmployessDetails.scss';

const EmployeeList = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({ employeeId: '', employeeName: '', email: '' });

  const { data, error, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });

  const mutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setOpen(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(employeeData);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="employee-list-container">
      <div className="employee-list-header">
        <h2>Employee List</h2>
        <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<FaPlus />}>
          Add Employee
        </Button>
      </div>
      <MaterialTable
        title={false}
        data={data}
        columns={[
          { title: 'Employee ID', field: 'employeeId' },
          { title: 'Employee Name', field: 'employeeName' },
          { title: 'Email', field: 'email' },
        ]}
        options={{
          search: true,
          actionsColumnIndex: -1,
          draggable: false,
          paging: true,
          headerStyle: { color: 'black', fontWeight: 'bold', fontSize: '18px' },
          rowStyle: {
            '&:hover': {
              backgroundColor: 'inherit',
            },
          },
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Employee ID"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Employee Name"
              name="employeeName"
              value={employeeData.employeeName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Employee Email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              type="email"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
