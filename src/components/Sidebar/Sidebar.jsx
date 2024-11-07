// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserFriends, FaBook, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import './Sidebar.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ToastContainer />
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaTachometerAlt /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/members" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaUserFriends /> Members
            </NavLink>
          </li>
          <li>
            <NavLink to="/books" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaBook /> Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/issued" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaThumbsUp /> Issued
            </NavLink>
          </li>
          <li>
            <NavLink to="/returned" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaThumbsUp /> Returned
            </NavLink>
          </li>
          <li>
            <NavLink to="/not-returned" className={({ isActive }) => (isActive ? 'active' : '')}>
              <FaThumbsDown /> Not Returned
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
