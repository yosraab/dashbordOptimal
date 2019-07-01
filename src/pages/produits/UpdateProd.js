import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Typography, Modal, Button, IconButton } from '@material-ui/core/';
import { CheckCircleTwoTone, CreateTwoTone } from '@material-ui/icons/';
import ChipInput from 'material-ui-chip-input';
import { withToastManager } from 'react-toast-notifications/';
import { updateApplication } from '../../actions/produits';

class UpdateProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      symbole: '',
      features: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.app.name,
      symbole: this.props.app.symbole,
      features: this.props.app.features,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      symbole: this.state.symbole,
      features: this.state.features,
    };

    await this.props.updateApplication(this.props.app._id, data);
    this.handleClose();
    this.props.refresh();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeChips = chips => {
    this.setState({
      features: chips,
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
        <IconButton onClick={this.handleOpen}>
          <CreateTwoTone />
        </IconButton>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className="mui-modal mui-modal-warning mui-modal-sm">
            <div className="mui-modal-header">
              <Typography variant="h6" color="inherit">
                Update: <i>Application</i>
              </Typography>
            </div>
            <div className="mui-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  style={inputWidth}
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  type="text"
                  required
                  label="Name"
                />
                <TextField
                  type="text"
                  style={inputWidth}
                  name="symbole"
                  value={this.state.symbole}
                  onChange={this.handleChange}
                  label="Suffix"
                />
                <ChipInput defaultValue={this.state.features} onChange={chips => this.handleChangeChips(chips)} />
              </div>
            </div>
            <div className="mui-modal-footer">
              <Button variant="contained" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={this.handleSubmit} disabled={this.state.name === ''}>
                <CheckCircleTwoTone style={{ marginRight: 5, fontSize: 20 }} />
                Update
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
});
const mapDispatchToProps = { updateApplication };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(UpdateProd));
