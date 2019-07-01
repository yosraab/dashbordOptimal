/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core/';
import NoIdealState from '../../components/Commun/NoIdealState';
import EnhancedTableHead from '../../components/Commun/EnhancedTableHead';
import { fetchCustomers } from '../../actions/customers';
import UpdateClient from './UpdateClient';
import AddClient from './AddClient';
import DeleteClient from './DeleteClient';

const columnData = [
  { id: 'name', label: 'First name' },
  { id: 'familyName', label: 'Last name' },
  { id: 'email', label: 'Email' },
  { id: 'companyName', label: 'Company name' },
  { id: 'actions', label: 'Actions' },
];

class Clients extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  async componentDidMount() {
    await this.props.fetchCustomers(this.props.token);
    this.setState({ data: this.props.customers });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  
  refreshData = async () => {
  
    this.setState({
      data: this.props.customers,
    });
  };

  render() {
    const { data, rowsPerPage, page } = this.state;
    return (
      <Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" style={{ padding: '20px 0 0 20px' }}>
              Customers
            </Typography>
            <Typography variant="caption" style={{ paddingLeft: 20 }}>
              Here you can manage your customer.
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginRight: 20, placeItems: 'baseline' }}>
            <AddClient refresh={this.refreshData} />
          </div>
        </div>
        <div style={{ margin: '10px 10px 0 10px' }}>
          <Paper style={{ height: '70vh', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {this.state.data.length > 0 ? (
              <Table padding="dense">
                <EnhancedTableHead rowCount={data.length} columnData={columnData} />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client, index) => (
                    <TableRow hover tabIndex={-1} key={client._id}>
                      <TableCell>{client.firstName}</TableCell>
                      <TableCell>{client.lastName}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>{client.companyName}</TableCell>
                     <TableCell>
                        <div style={{ display: 'flex', flexDirection: 'row', placeContent: 'flex-end' }}>
                          <UpdateClient client={client} refresh={this.refreshData} />
                          <DeleteClient client={index} refresh={this.refreshData} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Fragment>
                <NoIdealState style={{ marginTop: '10vh' }} text="No data find" />
              </Fragment>
            )}
          </Paper>
          <div style={{ display: 'flex', flexDirection: 'row', placeItems: 'center', justifyContent: 'space-between' }}>
            <TablePagination
              component="div"
              count={this.state.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  locale: store.locale,
  token: store.auth.token,
  customers: store.customers,
});
const mapDispatchToProps = { fetchCustomers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
