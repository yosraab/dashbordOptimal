import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Typography, Modal, Button } from '@material-ui/core/';
import { CheckCircleTwoTone, AddCircleTwoTone } from '@material-ui/icons/';
import ChipInput from 'material-ui-chip-input';
import { withToastManager } from 'react-toast-notifications/';
import { createClient } from '../../actions/customers';

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      email:'',
      companyName:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
        "id": this.props.customers.length,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "email": this.state.email,
        "companyName": this.state.companyName
    };

    await this.props.createClient(data);
    this.handleClose();
    this.props.refresh();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const inputWidth = {
      width: 250,
      marginBottom: 15,
    };
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          <AddCircleTwoTone style={{ marginRight: 5, fontSize: 20 }} />
         Add Customer
        </Button>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className="mui-modal mui-modal-info mui-modal-sm">
            <div className="mui-modal-header">
              <Typography variant="h6" color="inherit">
                Adding: <i>Customer</i>
              </Typography>
            </div>
            <div className="mui-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  style={inputWidth}
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  type="text"
                  required
                  label="firstName"
                />
                <TextField
                  type="text"
                  style={inputWidth}
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  label="lastName"
                />
                
                <TextField
                  type="text"
                  style={inputWidth}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  label="email"
                />
                 <TextField
                  type="text"
                  style={inputWidth}
                  name="companyName"
                  value={this.state.companyName}
                  onChange={this.handleChange}
                  label="companyName"
                />

              </div>
            </div>
            <div className="mui-modal-footer">
              <Button variant="contained" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={this.state.firstName === ''}>
                <CheckCircleTwoTone style={{ marginRight: 5, fontSize: 20 }} />
                Add
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  locale: store.locale,
  customers:store.customers
});
const mapDispatchToProps = { createClient };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(AddClient));
