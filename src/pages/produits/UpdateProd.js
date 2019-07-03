import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { Typography,FormControl,IconButton, FormLabel,Select, MenuItem, Modal, Button,  Tabs, Tab, Avatar } from '@material-ui/core/';
import { CheckCircleTwoTone, CreateTwoTone } from '@material-ui/icons/';
import ChipInput from 'material-ui-chip-input';
import { withToastManager } from 'react-toast-notifications/';
import { updateProduct } from '../../actions/produits';
import {DefaultPic}  from '../../images/noproduct.png';
import  axios from 'axios';
class UpdateProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      color: '',
      description:'',
      image:'',
      features: [],
      listImages:[],
      value :0,
      stock:'',
      logo: '',
      itemCondition:'',
      audience:'',
      logoManu: '',
      nameMan:'',
      id:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {

    event.preventDefault();
    const features = {
      color: this.state.color,
      itemCondition: this.state.itemCondition,
      stock: this.state.stock,
      audience: this.state.audience,
      brand:'optimal'
    };

    const manufacturer = {
      nameMan:this.state.nameMan,
      logoMan:this.state.logoManu
     };

    const data = {
      name: this.state.name,
      categoryName:this.props.product.categoryName ,
      categoryFamily:this.props.product.categoryFamily ,
      description:this.state.description,

      image: this.state.listImages,
      feature: features,
      manufacturer:manufacturer,
    };

    await this.props.updateProduct(this.props.product._id,data,
      () => {
      this.props.toastManager.add('update Product with success', {
          appearance: 'success',
          autoDismiss: true,
        });
      },
      () => {
       this.props.toastManager.add('update Product failed', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
    this.handleClose();
    this.props.refresh();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeStock = event => {
    this.setState({
     stock: event.target.value,
    });
  };

  handleChangeChips = chips => {
    this.setState({
      features: chips,
    });
  };

  handleOpen = () => {
    this.setState({ 
      open: true,
      name: this.props.product.name,
      color:  this.props.product.feature.color,
      description: this.props.product.description,
      image: this.props.product.image,
      features: [],
      value :0,
      listImages:this.props.product.image,
      stock: this.props.product.feature.stock,
      logo:  this.props.product.feature.logo,
      itemCondition: this.props.product.feature.itemCondition,
      audience: this.props.product.feature.audience,
      logoManu:  this.props.product.manufacturer.logoMan,
      nameMan: this.props.product.manufacturer.nameMan,
      id :this.props.product._id
  
    
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  handleChangeImage = event => {
    const listImages=this.state.listImages
    const form = new FormData();
    form.append('uploadedfile', event.target.files[0]);
     axios('http://localhost:5000/api/upload/products', {
      method: 'POST',
      data: form
    })
  
    .then(response => {
      console.log(response)
        listImages.push(response.data.filePath)  
        this.setState({
          listImages: listImages
        })
    })
  
  };

  handleChangeLogo = event => {
    const form = new FormData();
    form.append('uploadedfile', event.target.files[0]);
     axios('http://localhost:5000/api/upload/logos', {
      method: 'POST',
      data: form
    })
  
    .then(response => {
      console.log(response)
   
        this.setState({
          logo: response.data.filePath
        })
    })
  
  };

  handleChangeLogoManu = event => {

    const form = new FormData();
    form.append('uploadedfile', event.target.files[0]);
     axios('http://localhost:5000/api/upload/logos', {
      method: 'POST',
      data: form
    })
  
    .then(response => {
      console.log(response)
   
        this.setState({
          logoManu: response.data.filePath
        })
    })
  
  };

  render() {
    const inputWidth = {
      width: 250,
      marginBottom: 15,
    };
    const inputFile={
      display: 'none',
    }
  
    return (
      <div>
        <IconButton  onClick={this.handleOpen}>
            <CreateTwoTone />
        </IconButton>
        <Modal open={this.state.open} onClose={this.handleClose}>
          <div className="mui-modal mui-modal-warning mui-modal-lg">
            <div className="mui-modal-header">
              <Typography variant="h6" color="inherit">
                Update: <i>Product</i>
              </Typography>
            </div>
            <div className="mui-modal-header-tabs">
              <Tabs value={this.state.value} onChange={this.handleChangeTab}>
                <Tab label={"informations"} />
                <Tab label={"features"} />
                <Tab label={"manuFacturer"} />
              </Tabs>
            </div>
            <div className="mui-modal-body">
            {this.state.value === 0 && (
              <Fragment>
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
                          style={inputWidth}
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}
                          multiline
                          rows="2"
                          rowsMax="4"
                          label={"description"}
                        />
                                     <input
        accept="image/*"
        onChange={this.handleChangeImage}
        id="contained-button-file"
        multiple
        style={inputFile}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
                    </div>
     <div style={{ display: 'flex', flexDirection: 'column' }}>
     

      <div style={{ display: 'flex', flexDirection:'row' }} >
                      {this.state.listImages.length>0 && this.state.listImages.map(item=> (
                       
                                  <Avatar
                                      style={{
                                        width: 80,
                                        height: 80,
                                        margin: '0 auto 10px auto',
                                      }}
                                      alt="Product picture"
                                      src={item}
                                    />
                
                      ))}
      </div>
</div>
      </Fragment>
            )}
               {this.state.value === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                   


<FormControl>
                      <FormLabel>
                       Stock
                      </FormLabel>
                      <Select
                          value={this.state.stock}
                          onChange={this.handleChangeStock}
                          name="stock"
                          style={inputWidth}
                        >
                          <MenuItem  value={'in stock'}>
                          in stock
                          </MenuItem>
                            <MenuItem  value={'in arrival'}>
                            in arrival
                           </MenuItem>
                            <MenuItem  value={'on command'}>
                              <em>on command</em>
                            </MenuItem>
                        </Select>
                     
                    </FormControl>

                    <TextField
                      style={inputWidth}
                      name="itemCondition"
                      value={this.state.itemCondition}
                      onChange={this.handleChange}
                      type="text"
                      required
                      label="itemCondition"
                    />
                   
                    <TextField
                        style={inputWidth}
                        name="color"
                        value={this.state.color}
                        onChange={this.handleChange}
                        type="color"
                        label={"color"}
                      />
                       <TextField
                          style={inputWidth}
                          name="audience"
                          value={this.state.audience}
                          onChange={this.handleChange}
                          multiline
                          rows="2"
                          rowsMax="4"
                          label={"Audience"}
                        />
        <input
        accept="image/*"
        onChange={this.handleChangeLogo}
        id="contained-button-file"
        multiple
        style={inputFile}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <Avatar
                                      style={{
                                        width: 80,
                                        height: 80,
                                        margin: '0 auto 10px auto',
                                      }}
                                      alt="Product picture"
                                      src={this.state.logo}
                                    />
        </div>
               )}

                  {this.state.value === 2 && (
                       <div style={{ display: 'flex', flexDirection: 'column' }}>
                       <TextField
                         style={inputWidth}
                         name="nameMan"
                         value={this.state.nameMan}
                         onChange={this.handleChange}
                         type="text"
                         required
                         label="Name Manufacturer"
                       />
                       <input
        accept="image/*"
        onChange={this.handleChangeLogoManu}
        id="contained-button-file"
        multiple
        style={inputFile}
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>

      
      <Avatar
                                      style={{
                                        width: 80,
                                        height: 80,
                                        margin: '0 auto 10px auto',
                                      }}
                                      alt="Product picture"
                                      src={this.state.logoManu}
                                    />
           </div>
               )}
            </div>
            <div className="mui-modal-footer">
              <Button variant="contained" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={this.handleSubmit} disabled={this.state.name === ''}>
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
const mapDispatchToProps = { updateProduct };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(UpdateProd));
