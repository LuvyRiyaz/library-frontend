import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MaterialTable from '@material-table/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import { getReturnedBooks, returnBook } from '../../api/returnedBook';
import './ReturnedBook.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchBooks } from '../../api/books';
import { fetchEmployees } from '../../api/employee';

const ReturnBook = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [returnData, setReturnData] = useState({ title: '', employeeId: '', status: 'Returned' });

  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });

  const { data: returnedBooks, error, isLoading } = useQuery({
    queryKey: ['returnedBooks'],
    queryFn: getReturnedBooks,
  });

  const mutation = useMutation({
    mutationFn: returnBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['returnedBooks']);
      setOpen(false);
      toast.success('Book has been returned');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReturnData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(returnData);
    setReturnData({ title: '', employeeName: '', status: 'Returned' });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="return-book-container">
      <div className="return-book-header">
        <h2>Return Book</h2>
        <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<FaPlus />}>
          Return Book
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Return Book</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Title"
              name="title"
              value={returnData.title}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              {books.map((book) => (
                <MenuItem key={book._id} value={book.title}>
                  {book.title}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Employee ID"
              name="employeeId"
              value={returnData.employeeId}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee.employeeId}>
                  {employee.employeeId}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Status"
              name="status"
              value={returnData.status}
              fullWidth
              disabled
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Return Book
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <MaterialTable
        title={false}
        columns={[
          { title: 'Title', field: 'title' },
          { title: 'Employee ID', field: 'employeeId' },
          { title: 'Issue Date', field: 'issueDate', type: 'date' },
          { title: 'Due Date', field: 'dueDate', type: 'date' },
          { title: 'Status', field: 'status' },
        ]}
        data={returnedBooks}
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
      <ToastContainer />
    </div>
  );
};

export default ReturnBook;
