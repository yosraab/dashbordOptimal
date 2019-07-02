/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core/';
import { fetchAllUsers } from '../../actions/users';
import DeleteUser from './modal/DeleteUserDialog';
import UpdateUserModal from './modal/UpdateUserModal';
import AddUserTabs from './modal/AddUserModal';
import NoIdealState from '../../components/Commun/NoIdealState';
import EnhancedTableHead from '../../components/Commun/EnhancedTableHead';

const columnData = [
  { id: 'number', label: 'Number' },
  { id: 'firstName', label: 'Nom' },
  { id: 'lastName', label: 'Prenom' },
  { id: 'role', label: 'Email' },
  { id: 'actions', label: 'Actions' },
];



class UserSettings extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  async componentWillMount() {
    await this.props.fetchAllUsers(this.props.token, this.props.refreshToken);
    this.setState({ data: this.props.listusers });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.listusers });
  }

  refreshData = async () => {
    await this.props.fetchAllUsers(this.props.token, this.props.refreshToken);
    this.setState({ data: this.props.listusers });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { data, rowsPerPage, page } = this.state;
    return (
      <Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" style={{ padding: '20px 0 0 20px' }}>
              Users
            </Typography>
            <Typography variant="caption" style={{ paddingLeft: 20 }}>
              View, add or manage your system's users.
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginRight: 20, placeItems: 'baseline' }}>
            <AddUserTabs refresh={this.refreshData} />
          </div>
        </div>
        <div style={{ width: '100%', margin: '10px 10px 0 10px' }}>
          <Paper style={{ height: '70vh', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {this.state.data.length > 0 ? (
              <Table padding="dense">
                <EnhancedTableHead rowCount={data.length} columnData={columnData} />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                    <TableRow hover tabIndex={-1} key={user._id}>
                      <TableCell>{index}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                          <UpdateUserModal user={user} refresh={this.refreshData} />
                          <DeleteUser user={user} refresh={this.refreshData} />
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
  listusers: store.users,
  token: store.auth.token,
  refreshToken: store.auth.refreshToken
});
const mapDispatchToProps = { fetchAllUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSettings);
