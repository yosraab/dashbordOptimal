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
import { updateCand } from '../../actions/candidatures';

class UpdateCandidature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 0,
                status:'wait'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

 
   

    async handleSubmit(event) {
        event.preventDefault();


        await this.props.updateCand(this.props.candidature._id, this.state.status, this.props.token,this.props.refreshToken
            ,() => {
                this.props.toastManager.add('update status candidature  with success', {
                  appearance: 'success',
                  autoDismiss: true,
                });
              },
              () => {
                this.props.toastManager.add('update status candidature failed', {
                  appearance: 'error',
                  autoDismiss: true,
                });
              }
            );
        this.handleClose();
        this.props.refresh();
    }

    handleChange = event => {
        this.setState({
            status: event.target.value,
        });
    };

  

    handleOpen = () => {
        this.setState({ open: true ,       status: this.props.candidature.status});
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
                                Editing: <i>Candidature</i>
                            </Typography>
                        </div>
                     
                        <div className="mui-modal-body">
                             <FormControl component="fieldset" >
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup
                                aria-label="Gender"
                                name="Status"
                                value={this.state.status}
                                onChange={this.handleChange}
                                >
                                <FormControlLabel value="approved" control={<Radio />} label="approved" />
                                <FormControlLabel value="rejected" control={<Radio />} label="rejected" />
                               
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="mui-modal-footer">
                            <Button variant="contained" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={this.handleSubmit} >
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
    
  token: store.auth.token,
  refreshToken: store.auth.refreshToken
});
const mapDispatchToProps = { updateCand };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withToastManager(UpdateCandidature));
