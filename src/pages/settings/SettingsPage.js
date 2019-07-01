import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { LocalCafeTwoTone, PeopleTwoTone } from '@material-ui/icons/';
import DetailsSettings from './DetailsSettings';
import ListUsers from './userSettings';

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Fragment>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={this.handleChange}
            textColor="primary"
            indicatorColor="primary"
            style={{ backgroundColor: '#fff', color: '#1c1c1c', evaluation: 5, borderColor: '#000', borderWidth: 1 }}
          >
            <Tab icon={<LocalCafeTwoTone />} label="informations" style={{ width: 150 }} />
            <Tab icon={<PeopleTwoTone />} label="Users" style={{ width: 150 }} />
          </Tabs>
        </AppBar>
        {value === 0 && <DetailsSettings />}
        {value === 1 && <ListUsers />}
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
});
export default connect(
  mapStateToProps,
  {}
)(SettingsPage);
