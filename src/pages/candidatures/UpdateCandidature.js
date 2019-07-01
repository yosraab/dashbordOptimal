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
import { updateCopy } from '../../actions/candidatures';

class UpdateCandidature extends Component {
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

    componentDidMount() {
        this.setState({
            application: this.props.copy.application,
            deviceNb: this.props.copy.deviceNb,
            dist: this.props.copy.dist,
            validity: this.props.copy.validity,
            state: this.props.copy.state,
            features: this.props.copy.features,
        });
    }

    handleChangeTab = (event, value) => {
        this.setState({ value });
    };

    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            application: this.state.application,
            deviceNb: this.state.deviceNb,
            dist: this.state.dist,
            validity: this.state.validity,
            features: this.state.features,
            state: this.state.state,
        };

        await this.props.updateCopy(this.props.copy._id, data);
        this.handleClose();
        this.props.refresh();
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    // handleChangeSwitch = name => event => {
    //   this.setState({ [name]: event.target.checked });
    // };

    handleChangeFeatures = feature => event => {
        // const features = { ...this.state.features };
        const { features } = this.state;
        features[feature] = event.target.checked;

        this.setState({ features });
    };

    handleOpen = () => {
        this.setState({ open: true });
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
                                <Tab label="Features" />
                            </Tabs>
                        </div>
                        <div className="mui-modal-body">
                            {value === 0 && (
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <FormControl style={inputWidth}>
                                            <InputLabel htmlFor="application">Application</InputLabel>
                                            <Select
                                                value={this.state.application}
                                                onChange={this.handleChange}
                                                required
                                                inputProps={{
                                                    name: 'application',
                                                    id: 'application',
                                                }}
                                            >
                                                {this.props.produits.map(item => {
                                                    return <MenuItem value={item._id}>{item.name}</MenuItem>;
                                                })}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            style={inputWidth}
                                            name="deviceNb"
                                            value={this.state.deviceNb}
                                            onChange={this.handleChange}
                                            type="text"
                                            required
                                            label="Device number"
                                        />
                                        <FormControl style={inputWidth}>
                                            <InputLabel htmlFor="dist">Distribution</InputLabel>
                                            <Select
                                                value={this.state.dist}
                                                onChange={this.handleChange}
                                                required
                                                inputProps={{
                                                    name: 'dist',
                                                    id: 'dist',
                                                }}
                                            >
                                                <MenuItem value="demo">Demonstration</MenuItem>
                                                <MenuItem value="premium">Premium</MenuItem>
                                                <MenuItem value="ultimate">Ultimate</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            type="text"
                                            style={inputWidth}
                                            name="validity"
                                            value={this.state.validity}
                                            onChange={this.handleChange}
                                            label="Validity"
                                        />
                                    </div>
                                    <FormControl style={{ marginLeft: 20 }}>
                                        <FormLabel component="legend">State</FormLabel>
                                        <RadioGroup
                                            name="state"
                                            value={this.state.state}
                                            onChange={this.handleChange}
                                            style={{ display: 'flex', flexDirection: 'column' }}
                                        >
                                            <FormControlLabel
                                                value="notRegistred"
                                                control={<Radio color="secondary" />}
                                                label="Not registred"
                                            />
                                            <FormControlLabel value="registred" control={<Radio color="secondary" />} label="Registred" />
                                            <FormControlLabel value="expired" control={<Radio color="secondary" />} label="Expired" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            )}
                            {value === 1 && (
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <FormGroup>
                                        {this.state.features.forEach((feature, key) => {
                                            return (
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={feature} value={feature} onChange={this.handleChangeFeatures(key)} />
                                                    }
                                                    label={key}
                                                />
                                            );
                                        })}
                                    </FormGroup>
                                </div>
                            )}
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
    produits: store.produits,
});
const mapDispatchToProps = { updateCopy };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withToastManager(UpdateCandidature));
