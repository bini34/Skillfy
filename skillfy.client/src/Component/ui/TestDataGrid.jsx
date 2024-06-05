// App.jsx
import React from 'react';
import DataGrid from './DataGrid';

const TestDataGrid = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        name: 'Alice',
        age: 25,
        country: 'USA',
      },
      {
        name: 'Bob',
        age: 30,
        country: 'UK',
      },
      {
        name: 'Charlie',
        age: 35,
        country: 'Canada',
      },
    ],
    []
  );

  return (
    <div>
      <h1>Data Grid with Actions</h1>
      <DataGrid columns={columns} data={data} />
    </div>
  );
};

export default TestDataGrid;
