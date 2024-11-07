// import React, { useState } from 'react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { addBook } from '../../api/books';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

// const AddBook = ({ open, onClose }) => {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   const [ISBN, setISBN] = useState('');
//   const queryClient = useQueryClient();
  
//   const mutation = useMutation({
//     mutationFn: addBook,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['books']}).then(toast.success('Book added successfully!'));
//       setTimeout(() => {
//         onClose();
//         setTitle('');
//         setAuthor('');
//         setQuantity('');
//         setPrice('');
//         setISBN('');
//       }, 5500); // 2 minutes delay
//     },
//     onError: (error) => {
//       toast.error(`Error adding book: ${error.message}`);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutation.mutate({ title, author, quantity, price, ISBN });
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add Book</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit} className="add-book-form">
//           <TextField
//             label="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Author"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Quantity"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="ISBN"
//             value={ISBN}
//             onChange={(e) => setISBN(e.target.value)}
//             required
//             fullWidth
//             inputProps={{
//               maxLength: 13,
//             }}
//             margin="normal"
//           />
//           <DialogActions>
//             <Button onClick={onClose}>Cancel</Button>
//             <Button type="submit">Add Book</Button>
//           </DialogActions>
//         </form>
//       </DialogContent>
//       <ToastContainer />
//     </Dialog>
//   );
// };

// export default AddBook;
