import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MaterialTable from '@material-table/core';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import { fetchBooks, addBook, uploadBooksFromExcel } from '../../api/books';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookList.scss';

const BookList = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    quantity: '',
    price: '',
    ISBN: '',
  });
  const [file, setFile] = useState(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const addBookMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setOpen(false);
      resetForm();
      toast.success('Book added successfully!');
    },
    onError: (error) => {
      toast.error('Error adding book: ' + error.message);
    },
  });

  const uploadBooksMutation = useMutation({
    mutationFn: uploadBooksFromExcel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      setOpen(false);
      resetForm();
      toast.success('Books added from Excel successfully!');
    },
    onError: (error) => {
      toast.error('Error uploading books: ' + error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      uploadBooksMutation.mutate(formData);
    } else {
      addBookMutation.mutate(bookData);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    setFile(null);
  };

  const resetForm = () => {
    setBookData({
      title: '',
      author: '',
      quantity: '',
      price: '',
      ISBN: '',
    });
    setFile(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formatISBN = (isbn) => {
    if (!isbn || typeof isbn !== 'string') return isbn;

    const cleanISBN = isbn.replace(/\D/g, '');

    const patterns = [
      /^(\d{3})(\d)(\d{2})(\d{4})(\d)$/, 
      /^(\d{3})(\d)(\d{3})(\d{5})(\d)$/, 
    ];

    const patternIndex =
      cleanISBN.length === 10 ? 0 : cleanISBN.length === 13 ? 1 : -1;

    if (patternIndex === -1) {
      return isbn;
    }

    return cleanISBN.replace(patterns[patternIndex], '$1-$2-$3-$4-$5');
  };

  return (
    <div className="book-list-container">
      <ToastContainer/>
      <div className="book-list-header">
        <h2>Book List</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          startIcon={<FaPlus />}
        >
          Add Book
        </Button>
      </div>
      <MaterialTable
        title={false}
        data={data}
        columns={[
          { title: 'Book Title', field: 'title' },
          { title: 'Author', field: 'author' },
          { title: 'Quantity', field: 'quantity' },
          { title: 'Price', field: 'price' },
          {
            title: 'ISBN',
            field: 'ISBN',
            render: (rowData) => formatISBN(rowData.ISBN),
          },
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
        <DialogTitle>Add Book</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Quantity"
              name="quantity"
              value={bookData.quantity}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Price"
              name="price"
              value={bookData.price}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="ISBN"
              name="ISBN"
              value={bookData.ISBN}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{
                maxLength: 13,
              }}
            />
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ marginTop: '16px', display: 'block' }}
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

export default BookList;