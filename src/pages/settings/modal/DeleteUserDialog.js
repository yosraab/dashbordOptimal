/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';
import Button from '@material-ui/core/Button/';
import Delete from '@material-ui/icons/DeleteTwoTone';
import IconButton from '@material-ui/core/IconButton';
import { deleteUser } from '../../../actions/users';

class DeleteUserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
    };
  }

  handleCloseDeleteModalWithOk = async () => {
   await this.props.deleteUser(this.props.user._id, this.props.token, this.props.refreshToken);
    this.setState({ openDeleteDialog: false });
    this.props.refresh();
  };

  handleCloseDeleteModalWithNo = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleOpenDeleteModal = () => {
    this.setState({ openDeleteDialog: true });
  };

  render() {
    return (
      <Fragment>
        <IconButton onClick={this.handleOpenDeleteModal} color="secondary">
          <Delete />
        </IconButton>
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.state.openDeleteDialog}
          onClose={this.handleCloseDeleteModalWithNo}
        >
          <DialogTitle id="responsive-dialog-title">Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete ?{': '}
              <strong>{`${this.props.user.firstName} ${this.props.user.lastName}?`}</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDeleteModalWithOk} color="primary">
              Yes
            </Button>
            <Button onClick={this.handleCloseDeleteModalWithNo} color="secondary">
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
  refreshToken: store.auth.refreshToken
});

export default connect(
  mapStateToProps,
  { deleteUser }
)(DeleteUserDialog);
