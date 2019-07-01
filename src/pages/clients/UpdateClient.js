import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {
    Typography,
    Modal,
    Button,
    MenuItem,
    RadioGroup,
    Radio,
    FormLabel,
    Select,
    FormControlLabel,
    Switch,
    FormControl,
    InputLabel,
    Tabs,
    Tab,
    IconButton,
    FormGroup,
} from '@material-ui/core/';
import { CheckCircleTwoTone, CreateTwoTone } from '@material-ui/icons/';
import { withToastManager } from 'react-toast-notifications/';
import { updateClient } from '../../actions/customers';

class UpdateClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 0,
            application: '',
            deviceNb: '',
            dist: '',
            validity: '',
            state: '',
            features: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  

    handleChangeTab = (event, value) => {
        this.setState({ value });
    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            id:this.props.client.id,
            firstName: this.state.firstName,
        lastName: this.state.lastName,
            email: this.state.email,
            companyName: this.state.companyName
        };
console.log(data)
        await this.props.updateClient(data);
        this.handleClose();
        this.props.refresh();
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    handleOpen = () => {
        console.log(this.props.client)
        this.setState({
             open: true,    
            firstName: this.props.client.firstName,
            lastName: this.props.client.lastName,
            email: this.props.client.email,
            companyName: this.props.client.companyName,
     });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { value } = this.state;
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
                    <div className="mui-modal mui-modal-warning">
                        <div className="mui-modal-header">
                            <Typography variant="h6" color="inherit">
                                Editing: <i>Copy</i>
                            </Typography>
                        </div>
                        <div className="mui-modal-header-tabs">
                            <Tabs value={value} onChange={this.handleChangeTab}>
                                <Tab label="Informations" />
                            </Tabs>
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
 
});
const mapDispatchToProps = { updateClient };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withToastManager(UpdateClient));
