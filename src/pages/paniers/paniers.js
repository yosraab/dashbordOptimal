/* eslint-disable react/destructuring-assignment,react/no-access-state-in-setstate */
import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Paper, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@material-ui/core/';
import NoIdealState from '../../components/Commun/NoIdealState';
import EnhancedTableHead from '../../components/Commun/EnhancedTableHead';
import { fetchPaniers } from '../../actions/paniers';

const columnData = [
  { id: 'name', label: 'createdAt ' },
  { id: 'name', label: 'Customer ' },
  { id: 'createdAt', label: 'qty' },
  { id: 'user', label: 'Product' },
];

class Paniers extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  async componentDidMount() {
    await this.props.fetchPaniers(this.props.token);
    this.setState({
      data: this.props.paniers,
    });
  }

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
              Paniers
            </Typography>
            <Typography variant="caption" style={{ paddingLeft: 20 }}>
              Here, you can manage the list of device that your products are installed on.
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginRight: 20, placeItems: 'baseline' }} />
        </div>
        <div style={{ margin: '10px 10px 0 10px' }}>
          <Paper style={{ height: '70vh', width: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
            {this.state.data.length > 0 ? (
              <Table padding="dense">
                <EnhancedTableHead rowCount={data.length} columnData={columnData} />
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(panier => (
                    <TableRow hover tabIndex={-1} key={panier._id}>
                    <TableCell>{moment().subtract(10, 'days').format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                      <TableCell>{panier.customer}</TableCell>
                      <TableCell>{panier.qty}</TableCell>
                      <TableCell>{panier.products}</TableCell>
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
  paniers: store.paniers,
});
const mapDispatchToProps = { fetchPaniers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Paniers);
