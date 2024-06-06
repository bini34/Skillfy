// DataGrid.jsx
import React from 'react';
import { useTable } from 'react-table';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const DataGrid = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ borderBottom: 'solid 3px red', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px' }}>
                {column.render('Header')}
              </th>
            ))}
            <th></th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray' }}>
                  {cell.render('Cell')}
                </td>
              ))}
              <td>
                <Menu
                  menuButton={<MenuButton>⋮</MenuButton>}
                >
                  <MenuItem onClick={() => alert('Edit')}>Edit</MenuItem>
                  <MenuItem onClick={() => alert('Update')}>Update</MenuItem>
                </Menu>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataGrid;
