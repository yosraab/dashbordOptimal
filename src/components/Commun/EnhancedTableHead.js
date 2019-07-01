import React, { Component } from 'react';
import { TableCell, TableHead, TableRow } from '@material-ui/core/';

export default class EnhancedTableHead extends Component {
  render() {
    const { checkbox, columnData } = this.props;
    return (
      <TableHead>
        <TableRow>
          {checkbox && <TableCell />}
          {columnData.map(
            (column, i) => (
              <TableCell
                key={column.id}
                style={i === columnData.length - 1 ? { textAlign: 'right' } : { textAlign: 'left' }}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                {column.label}
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}
