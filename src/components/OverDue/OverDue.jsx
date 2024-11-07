import React from 'react';
import { useQuery } from '@tanstack/react-query';
import MaterialTable from '@material-table/core';
import { getOverdueBooks } from '../../api/notreturned'; // Update the import path as necessary
import './OverDue.scss';

const OverdueBooks = () => {
  const { data: overdueBooks, error, isLoading } = useQuery({
    queryKey: ['overdueBooks'],
    queryFn: getOverdueBooks,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overdue-books-container">
      <div className="overdue-books-header">
        <h2>Overdue Books</h2>
      </div>
      <MaterialTable
        title={false}
        columns={[
          { title: 'Title', field: 'title' },
          { title: 'Employee Id', field: 'employeeId' },
          { title: 'Issue Date', field: 'issueDate', type: 'date' },
          { title: 'Due Date', field: 'dueDate', type: 'date' },
          { title: 'Status', field: 'status' },
        ]}
        data={overdueBooks}
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
    </div>
  );
};

export default OverdueBooks;
