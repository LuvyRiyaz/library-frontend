// Layout.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import BookList from '../bookList/BookList';
import IssueBook from '../IssueBook/IssueBook';
import ReturnedBook from '../ReturnedBook/ReturnedBook';
import OverdueBooks from '../OverDue/OverDue';
import Employee from '../EmployeeDetails/EmployeeDetails';
import './Layout.scss'

const Layout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/members" element={<Employee />} />
          <Route path="/issued" element={<IssueBook />} />
          <Route path="/returned" element={<ReturnedBook />} />
          <Route path="/not-returned" element={<OverdueBooks />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
