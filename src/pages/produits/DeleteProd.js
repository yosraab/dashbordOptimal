import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/DeleteTwoTone';
import IconButton from '@material-ui/core/IconButton';
import { deleteApplication } from '../../actions/produits';

class DeleteProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleDelete = async () => {
    await this.props.deleteApplication(this.props.app._id);
    this.handleClose();
    this.props.refresh();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Fragment>
        <IconButton onClick={this.handleClickOpen} color="secondary">
          <Delete />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="responsive-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete ?{': '}
              <strong>{`${this.props.app.name}`}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDelete} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  token: store.auth.token,
});

export default connect(
  mapStateToProps,
  { deleteApplication }
)(DeleteProd);
