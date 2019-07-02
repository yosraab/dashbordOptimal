/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Paper, Table,IconButton, TableBody, TableCell, TablePagination, TableRow, Typography, Chip } from '@material-ui/core/';
import Visibility from '@material-ui/icons/Visibility';
import NoIdealState from '../../components/Commun/NoIdealState';
import EnhancedTableHead from '../../components/Commun/EnhancedTableHead';
import { fetchCategories } from '../../actions/produits';

const columnData = [
  { id: 'name', label: 'categoryName' },
  { id: 'symbole', label: 'categorySlug' },
  { id: 'actions', label: 'Actions' },
];

class Categories extends Component {
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

    const { match: { params } } = this.props;
    await this.props.fetchCategories(this.props.token, params.categName);
    this.setState({
      data: this.props.produits,
    });
  }

  refreshData = async () => {
    const { match: { params } } = this.props;
    await this.props.fetchCategories(this.props.token, params.categName);
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
    const { match: { params } } = this.props;
    const { data, rowsPerPage, page } = this.state;
    return (
      <Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" style={{ padding: '20px 0 0 20px' }}>
              Categories of {params.categName}
            </Typography>
          </div>
        </div>
        <div style={{ margin: '10px 10px 0 10px' }}>
          <Paper style={{ height: '70vh', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {this.state.data.length > 0 ? (
              <Table padding="dense">
                <EnhancedTableHead rowCount={data.length} columnData={columnData} />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(categ => (
                    <TableRow hover tabIndex={-1} key={categ._id}>
                      <TableCell>{categ.categoryName}</TableCell>
                      <TableCell>{categ.categorySlug}</TableCell>
                      <TableCell style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', placeContent: 'flex-end' }}>
                        <Link to={`/category/${categ.categorySlug}`}>
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
const mapDispatchToProps = { fetchCategories };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Categories);
