import React from 'react';
import { useTable } from 'react-table';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './DataGrid.css';

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
    <table {...getTableProps()} className="data-grid-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="data-grid-header">
                {column.render('Header')}
              </th>
            ))}
            <th className="data-grid-action-header"></th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="data-grid-cell">
                  {cell.render('Cell')}
                </td>
              ))}
              <td className="data-grid-action-cell">
                <Menu
                  menuButton={<MenuButton><MoreHorizIcon /></MenuButton>}
                >
                  <MenuItem onClick={() => alert('Edit')}>Edit</MenuItem>
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
