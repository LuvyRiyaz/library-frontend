import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MaterialTable from '@material-table/core';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import { getIssueBook, issueBook } from '../../api/issuedBook';
import './IssueBook.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchBooks } from '../../api/books';
import { fetchEmployees } from '../../api/employee';
const IssueBook = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [issueData, setIssueData] = useState({ title: '', employeeId: '', issueDate: '', dueDate: '' });
  const [dateError, setDateError] = useState('');
  const { data: books } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });
  const { data: employees } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });
  const { data: issuedBooks, error, isLoading } = useQuery({
    queryKey: ['issuedBooks'],
    queryFn: getIssueBook,
  });
  const mutation = useMutation({
    mutationFn: issueBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['issuedBooks']);
      setOpen(false);
      toast.success('Book is Issued');
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'dueDate') {
      const issueDate = new Date(issueData.issueDate);
      const dueDate = new Date(value);
      if (dueDate < issueDate) {
        setDateError('Due date cannot be earlier than the issue date');
      } else {
        setDateError('');
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dateError) {
      mutation.mutate(issueData);
      setIssueData({ title: '', employeeId: '', issueDate: '', dueDate: '' });
    }
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
    <div className="issue-book-container">
      <div className="issue-book-header">
        <h2>Issue Book</h2>
        <Button variant="contained" color="primary" onClick={handleClickOpen} startIcon={<FaPlus />}>
          Issue Book
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Issue Book</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Book Title"
              name="title"
              value={issueData.title}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              {books.map((book) => (
                book?.quantity > 0 && ( // Render only if quantity is greater than 0
                  <MenuItem key={book?._id} value={book?.title}>
                    {book?.title}
                  </MenuItem>
                ))
              )}
            </TextField>
            <TextField
              margin="dense"
              label="Employee ID"
              name="employeeId"
              value={issueData.employeeId}
              onChange={handleChange}
              select
              fullWidth
              required
            >
              {employees.map((employee) => (
                <MenuItem key={employee?._id} value={employee?.employeeId}>
                  {employee?.employeeId}
                </MenuItem>
              ))}
            </TextField>
            <TextField
  margin="dense"
  label="Issue Date"
  name="issueDate"
  type="date"
  value={issueData.issueDate}
  onChange={handleChange}
  fullWidth
  required
  InputLabelProps={{
    shrink: true, // Forces the label to shrink
  }}
/>
<TextField
  margin="dense"
  label="Due Date"
  name="dueDate"
  type="date"
  value={issueData.dueDate}
  onChange={handleChange}
  fullWidth
  required
  error={!!dateError}
  helperText={dateError}
  InputLabelProps={{
    shrink: true, // Forces the label to shrink
  }}
/>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={!!dateError}>
              Issue Book
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <MaterialTable
        title={false}
        columns={[
          { title: 'Book Title', field: 'title' },
          { title: 'Employee ID', field: 'employeeId' },
          { title: 'Issue Date', field: 'issueDate', type: 'date' },
          { title: 'Due Date', field: 'dueDate', type: 'date' },
          { title: 'Status', field: 'status' },
        ]}
        data={issuedBooks}
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
export default IssueBook;









