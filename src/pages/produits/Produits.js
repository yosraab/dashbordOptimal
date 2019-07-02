/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Paper, Table,IconButton, TableBody, TableCell, TablePagination, TableRow, Typography, Chip } from '@material-ui/core/';
import Visibility from '@material-ui/icons/Visibility';
import NoIdealState from '../../components/Commun/NoIdealState';
import EnhancedTableHead from '../../components/Commun/EnhancedTableHead';
import { fetchProduits } from '../../actions/produits';
import AddProduit from './AddProduit';
import DeleteApp from './DeleteProd';
import UpdateProd from './UpdateProd';


const columnData = [
  { id: 'image', label: 'Image' },
  { id: 'name', label: 'Name' },
  { id: 'slug', label: 'Slug' },
  { id: 'description', label: 'Description' },
  { id: 'actions', label: 'Actions' },
];

class Produits extends Component {
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

    
    await this.props.fetchProduits(this.props.token, params.productName);
    this.setState({
      data: this.props.produits,
    });
  }

  refreshData = async () => {
    const { match: { params } } = this.props;
    await this.props.fetchProduits(this.props.token, params.productName);
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
              Products of {params.productName}
            </Typography>
            <Typography variant="caption" style={{ paddingLeft: 20 }}>
              Here, you can add, edit, delete and manage the products you want to protect.
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginRight: 20, placeItems: 'baseline' }}>
            <AddProduit refresh={this.refreshData} categName={this.props.match.params.productName}  familyName={this.props.match.params.categName}/>
          </div>
        </div>
        <div style={{ margin: '10px 10px 0 10px' }}>
          <Paper style={{ height: '70vh', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {this.state.data.length > 0 ? (
              <Table padding="dense">
                <EnhancedTableHead rowCount={data.length} columnData={columnData} />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(prod => (
                    <TableRow hover tabIndex={-1} key={prod._id}>
                      <TableCell>
                          <img src={prod.image} style={{width:50, height:50}}/>
                      </TableCell>
                      <TableCell>{prod.name}</TableCell>
                      <TableCell>{prod.slug}</TableCell>
                      <TableCell>{prod.description}</TableCell>
                  
                      <TableCell style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', placeContent: 'flex-end' }}>
                     
                          <UpdateProd product={prod} refresh={this.refreshData} />
                          <DeleteApp product={prod} refresh={this.refreshData} />
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
const mapDispatchToProps = { fetchProduits };

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Produits);
