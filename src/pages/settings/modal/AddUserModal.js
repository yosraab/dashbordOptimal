/* eslint-disable no-unused-expressions */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import CheckCircle from '@material-ui/icons/CheckCircleTwoTone';
import Cancel from '@material-ui/icons/CancelTwoTone';
import {
  Avatar,
  Button,
  Checkbox,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@material-ui/core/';
import { withToastManager } from 'react-toast-notifications/';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import ListItemText from '@material-ui/core/ListItemText';
import {
  DeleteTwoTone,
  WarningTwoTone,
  AddCircleTwoTone,
  VisibilityTwoTone,
  VisibilityOffTwoTone,
} from '@material-ui/icons/';
import { remoteAPI } from '../../../config';
import DefaultPic from '../../../images/profil.png';
import { addUser } from '../../../actions/users';

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesList: [
        { name: 'superAdmin', value: 'superAdmin' },
        { name: 'admin', value: 'admin' },
        { name: 'analytic', value: 'analytic' },
      ],
      value: 0, // position of the tabview
      userName: '',
      role: [],
      firstName: '',
      lastName: '',
      image: null,
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({
      open: true,
      value: 0, // position of the tabview
      userName: '',
      password: null,
      password1: null,
      pin: null,
      role: [],
      rolesStatus: true,
      firstName: '',
      lastName: '',
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = {
      userName: this.state.userName,
      password: this.state.password,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      role: this.state.role,
    };
    await this.props.addUser(data, () => {}, () => {});
    this.props.refresh();
    this.handleClose();
  };

  handleChangeSelect = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const inputWidth = { width: '270px' };
    return (
      <Fragment>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          <AddCircleTwoTone style={{ marginRight: 5, fontSize: 20 }} />
          Add
        </Button>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className="mui-modal mui-modal-lg mui-modal-info">
            <div className="mui-modal-header">
              <Typography variant="h6" color="inherit">
                Adding: <i>User</i>
              </Typography>
            </div>
            <div className="mui-modal-body">
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <div style={{ flexDirection: 'column', display: 'flex', marginRight: 70 }}>
                  <div>
                    <TextField
                      style={inputWidth}
                      id="firstName"
                      label="First name"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.firstName}
                    />
                  </div>
                  <div>
                    <TextField
                      style={inputWidth}
                      id="lastName"
                      label="Last name"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.lastName}
                    />
                  </div>
                  <div>
                    <TextField
                      style={inputWidth}
                      id="userName"
                      label="Username"
                      onChange={this.handleChange}
                      margin="normal"
                      required
                      value={this.state.userName}
                    />
                  </div>
                  <FormControl>
                    <TextField
                      style={inputWidth}
                      id="password"
                      label="Password"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.password}
                      type="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                            {this.state.showPassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      style={inputWidth}
                      id="password1"
                      label="Confirm password"
                      onChange={this.handleChange}
                      margin="normal"
                      type="password"
                      value={this.state.password1}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                            {this.state.showPassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {/* {!this.state.confirmpassword && ( */}
                    {/* <FormHelperText */}
                    {/* style={{ */}
                    {/* display: 'flex', */}
                    {/* flexDirection: 'row', */}
                    {/* }} */}
                    {/* error */}
                    {/* > */}
                    {/* <WarningTwoTone style={{ fontSize: 14 }} /> */}
                    {/* <span style={{ paddingLeft: 5 }}> */}
                    {/* The two passwords are not identical */}
                    {/* </span> */}
                    {/* </FormHelperText> */}
                    {/* )} */}
                  </FormControl>
                </div>
                <div style={{ flexDirection: 'column', display: 'flex' }}>
                  <FormControl style={inputWidth}>
                    <InputLabel htmlFor="role">Roles</InputLabel>
                    <Select
                      value={this.state.role}
                      onChange={this.handleChangeSelect}
                      required
                      inputProps={{
                        name: 'role',
                        id: 'role',
                      }}
                    >
                      {this.state.rolesList.map(name => (
                        <MenuItem value={name.value}>{name.value}</MenuItem>
                      ))}
                    </Select>
                    {this.state.rolesStatus && (
                      <FormHelperText
                        style={{
                          color: 'orange',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        error
                      >
                        <WarningTwoTone style={{ fontSize: 14 }} />
                        <span style={{ paddingLeft: 5 }}>Required fields</span>
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="mui-modal-footer">
              <Button variant="contained" onClick={this.handleClose}>
                <Cancel style={{ marginRight: 5, fontSize: 20 }} />
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                disabled={
                  !this.state.password ||
                  this.state.password.length < 4 ||
                  !this.state.userName ||
                  !this.state.role ||
                  this.state.role.length === 0
                }
              >
                <CheckCircle style={{ marginRight: 5, fontSize: 20 }} />
                Add
              </Button>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
export default connect(
  mapStateToProps,
  { addUser }
)(withToastManager(AddUserModal));
