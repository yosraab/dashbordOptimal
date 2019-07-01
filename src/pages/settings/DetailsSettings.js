/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withToastManager } from 'react-toast-notifications/';
import {
  Input,
  InputLabel,
  FormLabel,
  FormControl,
  FormControlLabel,
  Switch,
  Button,
  Paper,
  Typography,
} from '@material-ui/core/';
import { CheckCircleTwoTone } from '@material-ui/icons/';
import { editSettings } from '../../actions/settings';

class DetailsSettings extends Component {
  constructor() {
    super();
    this.state = {
      port: 465,
      tls: false,
      host: '',
      user: '',
      pass: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      port:  this.props.settings.mailing &&  this.props.settings.mailing.port || '',
      tls:   this.props.settings.mailing && this.props.settings.mailing.tls || '',
      host:  this.props.settings.mailing && this.props.settings.mailing.host || '' ,
      user: this.props.settings.mailing && this.props.settings.auth.user || '',
      pass: this.props.settings.mailing &&  this.props.settings.auth.pass || '',
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      mailing: {
        port: this.state.port,
        tls: this.state.tls,
        host: this.state.host,
      },
      auth: {
        user: this.state.user,
        pass: this.state.pass,
      },
    };
    await this.props.editSettings(data);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleChangeTextField = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" style={{ padding: '20px 0 0 20px' }}>
              Settings
            </Typography>
            <Typography variant="caption" style={{ paddingLeft: 20 }}>
              Here you can edit your super system settings.
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginRight: 20, placeItems: 'baseline' }}>
            <Button type="submit" variant="contained" color="primary">
              <CheckCircleTwoTone style={{ marginRight: 5, fontSize: 20 }} />
              Save
            </Button>
          </div>
        </div>
        <div style={{ width: '100%', margin: '10px 10px 0 10px' }}>
          <Paper style={{ height: '70vh', width: '100%', overflowY: 'auto', overflowX: 'hidden', padding: 20 }}>
            <FormLabel component="legend">Mailing settings</FormLabel>
            <br />
            <FormControl style={{ width: 250 }}>
              <InputLabel htmlFor="port">Port</InputLabel>
              <Input id="port" type="number" value={this.state.port} onChange={this.handleChangeTextField('port')} />
            </FormControl>
            <br />
            <FormControl style={{ width: 250 }}>
              <InputLabel htmlFor="host">Host</InputLabel>
              <Input id="host" type="text" value={this.state.host} onChange={this.handleChangeTextField('host')} />
            </FormControl>
            <br />
            <FormControlLabel
              control={<Switch checked={this.state.tls} onChange={this.handleChange('tls')} value="tls" />}
              label="TLS"
            />
            <br />
            <FormLabel component="legend">Authentication</FormLabel>
            <br />
            <FormControl style={{ width: 250 }} >
              <InputLabel htmlFor="user">Username</InputLabel>
              <Input id="user" type="text" value={this.state.user} onChange={this.handleChangeTextField('user')} />
            </FormControl>
            <br />
            <FormControl style={{ width: 250 }}>
              <InputLabel htmlFor="pass">Password</InputLabel>
              <Input id="pass" type="text" value={this.state.pass} onChange={this.handleChangeTextField('pass')} />
            </FormControl>
            <br />
          </Paper>
        </div>
      </form>
    );
  }
}

const mapStateToProps = store => ({
  settings: store.settings,
});
export default connect(
  mapStateToProps,
  {
    editSettings,
  }
)(withToastManager(DetailsSettings));
