/* eslint-disable react/destructuring-assignment,no-unused-expressions */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import { CreateTwoTone, WarningTwoTone, VisibilityTwoTone, VisibilityOffTwoTone } from '@material-ui/icons/';
import CheckCircle from '@material-ui/icons/CheckCircleTwoTone';
import Cancel from '@material-ui/icons/CancelTwoTone';
import {
  Button,
  IconButton,
  InputAdornment,
  MuiThemeProvider,
  Select,
  TextField,
  Typography,
} from '@material-ui/core/';
import { withToastManager } from 'react-toast-notifications/';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { remoteAPI } from '../../../config';
import { updateUser } from '../../../actions/users';

class UpdateUserModal extends Component {
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
      password: null,
    };
  }

  componentDidMount() {
    this.setState({
      userName: this.props.user.userName,
      role: this.props.user.role,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    let data = {};

    if (this.state.password === null) {
      data = {
        userName: this.state.userName,
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        role: this.state.role,
      };
    } else {
      data = {
        userName: this.state.userName,
        password: this.state.password,
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        role: this.state.role,
      };
    }

    await this.props.updateUser(this.props.user._id, data, () => {}, () => {});
    this.props.refresh();
    this.handleClose();
  };

  handleChangeSelect = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const inputWidth = { width: 270, };
    return (
      <Fragment>
        <IconButton onClick={this.handleOpen}>
          <CreateTwoTone />
        </IconButton>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className="mui-modal mui-modal-lg mui-modal-warning">
            <div className="mui-modal-header">
              <Typography variant="h6" color="inherit">
                Editing: <i>User</i>
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
                  <div>
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
                  </div>
                  <div>
                    <TextField
                      style={inputWidth}
                      id="password1"
                      label="Confirm password"
                      onChange={this.handleChange}
                      margin="normal"
                      type="password"
                      value={this.state.confirmPassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                            {this.state.showPassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>
                  {/* {this.state.confirmpassword === false && ( */}
                  {/* <FormHelperText */}
                  {/* style={{ */}
                  {/* display: 'flex', */}
                  {/* flexDirection: 'row', */}
                  {/* }} */}
                  {/* error */}
                  {/* > */}
                  {/* <WarningTwoTone style={{ fontSize: 14 }} /> */}
                  {/* <span style={{ paddingLeft: 5 }}> */}
                  {/* Password dont match */}
                  {/* </span> */}
                  {/* </FormHelperText> */}
                  {/* )} */}
                </div>
                <div style={{ flexDirection: 'column', display: 'flex' }}>
                  <FormControl>
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
                        <span style={{ paddingLeft: 5 }}>Required</span>
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
              <MuiThemeProvider>
                <Button
                  variant="contained"
                  onClick={this.handleSubmit}
                  disabled={!this.state.userName || !this.state.role || this.state.role.length === 0}
                >
                  <CheckCircle style={{ marginRight: 5, fontSize: 20 }} />
                  Update
                </Button>
              </MuiThemeProvider>
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
  { updateUser }
)(withToastManager(UpdateUserModal));
