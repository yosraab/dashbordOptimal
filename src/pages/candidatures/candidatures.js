/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Paper, Table, TableBody,IconButton, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core/';
import moment from 'moment';
import Visibility from '@material-ui/icons/Visibility';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NoIdealState from '../../components/Commun/NoIdealState';
import EnhancedTableHead from '../../components/Commun/EnhancedTableHead';
import { fetchCandidatures } from '../../actions/candidatures';
import { fetchProduits } from '../../actions/produits';
import UpdateCandidature from './UpdateCandidature';
import DeleteCandidature from './DeleteCandidature';

const columnData = [
 
  { id: 'fullName', label: 'fullName' },
  { id: 'email', label: 'Email' },
  { id: 'state', label: 'Status' },
  { id: 'actions', label: 'Actions' },
  
];

class Candidatures extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 10,
      status:'waiting'
    };
  }

  async componentDidMount() {
    await this.props.fetchCandidatures(this.props.token);
    this.setState({
      data: this.props.candidatures,
    });
  }

  refreshData = async () => {
    await this.props.fetchCandidatures(this.props.token);
    this.setState({
      data: this.props.candidatures,
    });
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" style={{ padding: '20px 0 0 20px' }}>
              Candidatures
            </Typography>
            <Typography variant="caption" style={{ paddingLeft: 20 }}>
              Here, you can add, edit, delete and manage your products candidatures.
            </Typography>
          </div>

        </div>
        <div style={{ margin: '10px 10px 0 10px' }}>
          <Paper style={{ height: '70vh', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {this.state.data.length > 0 ? (
              <Table padding="dense">
                <EnhancedTableHead rowCount={data.length} columnData={columnData} />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((candidature, index) => (
                    <TableRow hover tabIndex={-1} key={candidature._id}>
                    <TableCell>{candidature.fullName}</TableCell>
  
                      <TableCell>{candidature.email}</TableCell>
  
                      <TableCell>
                        { data.length === index ? (
                          <span style={{ color: 'green' }}>Seen</span>
                        ) : (
                          <span style={{ color: 'orange' }}>Waiting</span>
                        )}
                      </TableCell>
                    
                      <TableCell>
                        <div style={{ display: 'flex', flexDirection: 'row', placeContent: 'flex-end' }}>
                        <IconButton onClick={()=>{ window.open(candidature.cvPath)}}>
                            <Visibility />
                          </IconButton>
                          <UpdateCandidature copy={candidature} refresh={this.refreshData} />
                          <DeleteCandidature copy={candidature} refresh={this.refreshData} />
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              placeItems: 'center',
              justifyContent: 'space-between',
            }}
          >
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
  candidatures: store.candidatures,
});
const mapDispatchToProps = { fetchCandidatures, fetchProduits };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Candidatures);
