/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { AppBar, Avatar, Divider, Drawer, IconButton, ListItem, ListItemIcon, Toolbar } from '@material-ui/core/';
import {
  VpnKeyTwoTone,
  LocalMallTwoTone,
  ExitToAppTwoTone,
  BugReportTwoTone,
  SupervisedUserCircleTwoTone,
  MenuTwoTone,
  SettingsTwoTone,
    ShoppingBasket
} from '@material-ui/icons/';
import WaiterLogo from '../images/logo.png';
import optimalLogo from '../images/optimal.png';
import { logout } from '../actions/auth';
import { fetchSettings } from '../actions/settings';
import { fetchAllUsers } from '../actions/users';
import defaultImage from '../images/profil.png';
import { remoteAPI } from '../config';

const Labels = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  margin: auto 0 auto 20px;
  & > span {
    font-size: 8px;
    color: #cdcdcd;
  }
  & > h1 {
    font-size: 15px;
    color: #fff;
    margin: 0;
  }
  ${props => (props.divider ? 'padding-left: 20px; border-left: 1px #cdcdcd solid' : '')};
`;

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      left: false,
    };
  }

  componentDidMount() {
    this.props.fetchSettings();
    this.props.fetchAllUsers(this.props.token);
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
      <Fragment>
        <AppBar position="relative">
          <Toolbar
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#666666',
            }}
          >
            <Labels>
              <IconButton onClick={this.toggleDrawer('left', true)}>
                <MenuTwoTone style={{ color: '#fff' }} />
              </IconButton>
              <Label divider>
                {this.props.user.image ? (
                  <Avatar alt="User" src={`${remoteAPI}${this.props.user.image}`} />
                ) : (
                  <Avatar alt="User" src={defaultImage} />
                )}
              </Label>
              <Label>
                <span>User</span>
                <h1>{this.props.user.firstName}</h1>
              </Label>
            </Labels>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Link to="/settings">
                <IconButton>
                  <SettingsTwoTone style={{ color: '#fff' }} />
                </IconButton>
              </Link>
              <IconButton onClick={() => this.props.logout(this.props.token, () => {})}>
                <ExitToAppTwoTone style={{ color: '#fff' }} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div tabIndex={0} role="button" onKeyDown={this.toggleDrawer('left', false)}>
            <Link to="/dashboard">
              <div className="drawer-header-menu">
                <img src={WaiterLogo} className="drawer-logo-img" alt="Brand logo" />
                <p>
                  <b>CMS</b>
                  <br />
                  <svg
                    style={{
                      color: '#555',
                      width: '10px',
                      margin: '3px 5px 0 5px',
                      height: 'auto',
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      // eslint-disable-next-line max-len
                      d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
                    />
                  </svg>
                </p>
              </div>
            </Link>
            
            <Divider />
            <Link to="/family" onClick={this.toggleDrawer('left', false)}>
              <ListItem>
                <ListItemIcon>
                  <LocalMallTwoTone />
                </ListItemIcon>
                    Category Family 
              </ListItem>
            </Link>
            <Divider />
            <Link to="/customers" onClick={this.toggleDrawer('left', false)}>
              <ListItem>
                <ListItemIcon>
                  <SupervisedUserCircleTwoTone />
                </ListItemIcon>
                Customers
              </ListItem>
            </Link>
            <Divider />
            <Link to="/candidatures" onClick={this.toggleDrawer('left', false)}>
              <ListItem>
                <ListItemIcon>
                  <VpnKeyTwoTone />
                </ListItemIcon>
                Candidatures
              </ListItem>
            </Link>
            <Divider />
            
          </div>
          <img alt="Company logo" src={optimalLogo} className="optimal-logo-img" />
        </Drawer>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  token: store.auth.token,
});

export default connect(
  mapStateToProps,
  { logout, fetchSettings, fetchAllUsers }
)(Layout);
