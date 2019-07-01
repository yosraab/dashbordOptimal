import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Typography, Modal, Button } from '@material-ui/core/';
import { CheckCircleTwoTone, AddCircleTwoTone } from '@material-ui/icons/';
import ChipInput from 'material-ui-chip-input';
import { withToastManager } from 'react-toast-notifications/';
import { createProduct } from '../../actions/produits';

class AddProduit extends Component {
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

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      symbole: this.state.symbole,
      features: this.state.features,
    };

    await this.props.createProduct(data, () => {}, () => {});
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
    console.log(this.props)
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          <AddCircleTwoTone style={{ marginRight: 5, fontSize: 20 }} />
         Add Product
        </Button>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className="mui-modal mui-modal-info mui-modal-sm">
            <div className="mui-modal-header">
              <Typography variant="h6" color="inherit">
                Adding: <i>Product</i>
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
                  name="slug"
                  value={this.state.slug}
                  onChange={this.handleChange}
                  label="Slug"
                />
                   <textarea
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  label="Description"
                />
                <input type="color" id="bgcolor" value="#ffffff"  onChange={this.handleChange} 
                  value={this.state.color}/>
                <ChipInput defaultValue={this.state.features} onChange={chips => this.handleChangeChips(chips)} />
              </div>
            </div>
            <div className="mui-modal-footer">
              <Button variant="contained" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={this.state.name === ''}>
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
});
const mapDispatchToProps = { createProduct };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(AddProduit));
