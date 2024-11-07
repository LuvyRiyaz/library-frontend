import React from 'react';
import { FaBook, FaUserFriends, FaClipboardList, FaThumbsUp, FaThumbsDown, FaCalendar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { fetchOverview } from '../../api/overview';
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss';

const Dashboard = () => {

  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['overview'],
    queryFn: fetchOverview
  });

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;


  const handleStatClick = (path) => {
    navigate(path);
  };

  const { totalBooks, totalMembers, returnedBooks, nonReturnedBooks, overdueBooks } = data;

  return (
    <div className="dashboard">
      <h2>Library Control Panel</h2>
      <div className="stats">
        <div className="stat-item blue" onClick={() => handleStatClick('/books')}>
          <div className="stat-content">
            <div className="stat-value">{totalBooks}</div>
            <div className="stat-icon">
              <FaBook />
            </div>
          </div>
          <div className="stat-label">Books</div>
        </div>
        <div className="stat-item green" onClick={() => handleStatClick('/books')}>
          <div className="stat-content">
            <div className="stat-value">{totalMembers}</div>
            <div className="stat-icon">
              <FaUserFriends />
            </div>
          </div>
          <div className="stat-label">Members</div>
        </div>
        <div className="stat-item orange" onClick={() => handleStatClick('/members')}>
          <div className="stat-content">
            <div className="stat-value">{new Date().toLocaleDateString()}</div>
            <div className="stat-icon">
              <FaCalendar />
            </div>
          </div>
          <div className="stat-label">Date Today</div>
        </div>
        <div className="stat-item green" onClick={() => handleStatClick('/books')}>
          <div className="stat-content">
            <div className="stat-value">{returnedBooks}</div>
            <div className="stat-icon">
              <FaThumbsUp />
            </div>
          </div>
          <div className="stat-label">Returned</div>
        </div>
        <div className="stat-item orange" onClick={() => handleStatClick('/returned')}>
          <div className="stat-content">
            <div className="stat-value">{nonReturnedBooks}</div>
            <div className="stat-icon">
              <FaThumbsDown />
            </div>
          </div>
          <div className="stat-label">Not Returned</div>
        </div>
        <div className="stat-item red" onClick={() => handleStatClick('/not-returned')}>
          <div className="stat-content">
            <div className="stat-value">{overdueBooks}</div>
            <div className="stat-icon">
              <FaClipboardList />
            </div>
          </div>
          <div className="stat-label">Overdue</div>
        </div>
    
      </div>
    </div>
  );
};

export default Dashboard;
