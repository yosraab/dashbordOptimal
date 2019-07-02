/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Paper, Table, IconButton, TableBody, TableCell, TablePagination, TableRow, Typography, Chip } from '@material-ui/core/';
import Visibility from '@material-ui/icons/Visibility';
import NoIdealState from '../../components/Commun/NoIdealState';
import EnhancedTableHead from '../../components/Commun/EnhancedTableHead';
import { fetchCategFamily } from '../../actions/produits';


const columnData = [
  { id: 'name', label: 'categoryFamily' },
  { id: 'actions', label: 'Actions' },
];

class FamilyCateg extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  async componentDidMount() {
    await this.props.fetchCategFamily(this.props.token);
    this.setState({
      data: this.props.produits,
    });
  }

  refreshData = async () => {
    await this.props.fetchCategFamily(this.props.token);
    this.setState({
      data: this.props.produits,
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
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" style={{ padding: '20px 0 0 20px' }}>
              Family List
            </Typography>
          </div>
        </div>
        <div style={{ margin: '10px 10px 0 10px' }}>
          <Paper style={{ height: '70vh', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {this.state.data.length > 0 ? (
              <Table padding="dense">
                <EnhancedTableHead rowCount={data.length} columnData={columnData} />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(categFamily => (
                    <TableRow hover tabIndex={-1} key={categFamily._id}>
                      <TableCell>{categFamily.categoryFamily}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', placeContent: 'flex-end' }}>
                          <Link to={`/family/${categFamily.categoryFamily}`}>
                      <IconButton onClick={this.handleClickOpen}>
                            <Visibility />
                          </IconButton>
                      </Link>
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
  token: store.auth.token,
  produits: store.produits,
});
const mapDispatchToProps = { fetchCategFamily };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FamilyCateg);
