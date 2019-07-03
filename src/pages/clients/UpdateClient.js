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
  CreateTwoTone,
  ArrowLeftTwoTone,
  ArrowRightTwoTone,
  DateRangeTwoTone,
  AccessTimeTwoTone,
  DeleteTwoTone,
  WarningTwoTone,
  AddCircleTwoTone,
  VisibilityTwoTone,
  VisibilityOffTwoTone,
} from '@material-ui/icons/';
import { updateCustomer } from '../../actions/customers';

type Props = {
  refresh: () => *,
  updateUser: () => *,
  toastManager: any,
};

class UpdateClient extends Component<Props, *> {
  constructor(props) {
    super(props);
    this.state = {
    
      value: 0, // position of the tabview
     
      password: null,
      password1: null,
  email:'',
      role: '',
      street: '',
      country: '',
      zip:'',
      city:'',
      phone: '',
      firstName: '',
      lastName: '',
     
      open: false,
     
      showPassword: false,
    };
  }

  handleOpen = () => {

    this.setState({
      open: true,
      value: 0, // position of the tabview
    
      
      role: 'user',
    
    
      street: this.props.client.local.address.street?this.props.client.local.address.street:'',
      country: this.props.client.local.address.country? this.props.client.local.address.country:'',
      zip:this.props.client.local.address.zip? this.props.client.local.address.zip: '',
      city:this.props.client.local.address.city?this.props.client.local.address.city :'',
      phone: this.props.client.local.phone?this.props.client.local.phone : '',
      firstName: this.props.client.firstName,
      lastName: this.props.client.lastName,
      email:this.props.client.email
  
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
    if(event.target.id === "password1"){
      if(this.state.password === event.target.value ){
        this.setState({
          confirmpassword: true,
          [event.target.id]: event.target.value,
        })
      }else {
        this.setState({
          confirmpassword: false,
          [event.target.id]: event.target.value,
        })
      }
    }
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
    const address ={
      city:this.state.city,
      country:this.state.country,
      zip:this.state.zip,
      street:this.state.street
    }
    const data = {
              firstName:this.state.firstName,
              lastName:this.state.lastName,
              email:this.state.email,
              phone:this.state.phone,
              roles: 'user',
              address: address
    };
    const password = (this.state.password !== '' && this.state.confirmpassword === true)?this.state.password : null
    await this.props.updateCustomer(
      this.props.client._id,
      data,
      password,
      this.props.token,
      this.props.refreshToken,
      () => {
        this.props.toastManager.add('update customer  with success', {
          appearance: 'success',
          autoDismiss: true,
        });
      },
      () => {
        this.props.toastManager.add('Update customer failed', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    );
    this.props.refresh();
    this.handleClose();
  };

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeMultipleSelect = event => {
    this.setState({ role: event.target.value });
  };

  
  
  verifyEmail=(value)=>{
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  verifyPassword=(value)=>{
    const passwordRex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W])/
    const length = value.length
    if(passwordRex.test(value) && length>6 && length<20){
      return true
    }
    return false
  }
 




  render() {
    const inputWidth = { width: '270px' };
    const inputWidth1 = { height: '60px' };
    const { value } = this.state;
 return (
      <Fragment>
           <IconButton  onClick={this.handleOpen}>
            <CreateTwoTone />
        </IconButton>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className="mui-modal mui-modal-lg mui-modal-warning">
            <div className="mui-modal-header">
              <Typography variant="h6" color="inherit">
                Update: Client
              </Typography>
            </div>
            <div className="mui-modal-header-tabs">
              <Tabs className="tabs-style" value={value} onChange={this.handleChangeTab}>
                <Tab label={'Information'} />
                <Tab label={'Connection'} />
              </Tabs>
            </div>
            <div className="mui-modal-body">
              {value === 0 && (
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flexDirection: 'column', display: 'flex', marginRight: 40 }}>
                    
                      <TextField
                        style={inputWidth}
                        id="firstName"
                        label={'FirstName'}
                        onChange={this.handleChange}
                        margin="normal"
                        value={this.state.firstName}
                      />
                   
                      <TextField
                        style={inputWidth}
                        id="lastName"
                        label={'LastName'}
                        onChange={this.handleChange}
                        margin="normal"
                        value={this.state.lastName}
                      />
                
                   
                   <TextField
                     style={inputWidth}
                     id="email"
                     label={'Email'}
                     error={!this.verifyEmail(this.state.email)}
                     onChange={this.handleChange}
                     margin="normal"
                     value={this.state.email}
                   />
               
                 
                      <TextField
                        style={inputWidth}
                        id="phone"
                        type="number"
                        label={"Phone"}
                        onChange={this.handleChange}
                        margin="normal"
                        value={this.state.phone}
                      />
                 </div>
                   
                  
                  <div style={{ flexDirection: 'column', display: 'flex' }}>
                    
                      <TextField
                        style={inputWidth}
                        id="street"
                        multiline
                        rows="2"
                        rowsMax="4"
                        label={"Street"}
                        onChange={this.handleChange}
                        margin="normal"
                        value={this.state.street}
                      />
                   
                      <TextField
                        style={inputWidth}
                        id="country"
                        label={'Country'}
                        onChange={this.handleChange}
                        margin="normal"
                        value={this.state.country}
                      />
                   
                   <TextField
                        style={inputWidth}
                        id="city"
                        label={'City'}
                        onChange={this.handleChange}
                        margin="normal"
                        value={this.state.city}
                      />
                   
                   <TextField
                        style={inputWidth}
                        id="zip"
                        type="number"
                        label={'Zip'}
                        onChange={this.handleChange}
                        margin="normal"
                        value={this.state.zip}
                      />
                   
                  </div>
               
                </div>
              )}
              {value === 1 && (
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <div style={{ flexDirection: 'column', display: 'flex', marginRight: 70 }}>
                  
                    <FormControl>
                      <TextField
                        style={inputWidth}
                        id="password"
                        label={'Password'}
                        onChange={this.handleChange}
                        margin="normal"
                        value={this.state.password}
                        type="password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
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
                        label={'confirm password'}
                        onChange={this.handleChange}
                        margin="normal"
                        type="password"
                        value={this.state.password1}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {this.state.showPassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {!this.state.confirmpassword && (
                        <FormHelperText
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                          error
                        >
                          <WarningTwoTone style={{ fontSize: 14 }} />
                          <span style={{ paddingLeft: 5 }}>
                              Password dont match
                          </span>
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                
                </div>
              )}
             
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
                  
                  !this.verifyEmail(this.state.email)
                }
              >
                <CheckCircle style={{ marginRight: 5, fontSize: 20 }} />
             Update
              </Button>
            </div>
          </div>
        </Modal>
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
  { updateCustomer }
)(withToastManager(UpdateClient));
