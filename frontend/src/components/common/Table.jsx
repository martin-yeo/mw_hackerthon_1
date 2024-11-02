import React from 'react';

export const Table = ({ 
  columns, 
  data, 
  onRowClick,
  className = '',
  striped = true,
  hoverable = true
}) => {
  return (
    <div className={`table-wrapper ${className}`}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={column.style}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} style={column.style}>
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .table-wrapper {
          width: 100%;
          overflow-x: auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        th {
          background-color: var(--background-paper);
          font-weight: 500;
          color: var(--text-primary);
        }

        tr:last-child td {
          border-bottom: none;
        }

        ${striped ? `
          tbody tr:nth-child(even) {
            background-color: var(--background-paper);
          }
        ` : ''}

        ${hoverable ? `
          tbody tr:hover {
            background-color: var(--background-hover);
          }
        ` : ''}

        .clickable {
          cursor: pointer;
        }

        @media (max-width: 768px) {
          th, td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}; 