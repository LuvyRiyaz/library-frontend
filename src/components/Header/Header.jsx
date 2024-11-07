import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1>Library</h1>
      <div className="user-info">
        <span>Admin</span>
      </div>
    </header>
  );
};

export default Header;
