import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {BrowserRouter, Route , withRouter} from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core/';
import {
  AccountCircleTwoTone,
  LockTwoTone,
  VisibilityOffTwoTone,
  VisibilityTwoTone,
  WarningTwoTone,
} from '@material-ui/icons/';
import LinearProgress from '@material-ui/core/LinearProgress';
import logo from '../images/logo.png';
import waiter from '../images/optimal.png';
import optimal from '../images/optimal.png';
import { signIn } from '../actions/auth';
import Alert from '../components/Commun/Alert';

const Container = styled.div`
  width: 320px;
  margin: auto;
  padding: 20vh 0 0 0;
`;
const BrandImageLogo = styled.img.attrs({
  src: logo,
  alt: 'Brand logo',
})`
  display: block;
  user-drag: none;
  user-select: none;
  width: 90px;
  height: auto;
  margin: auto auto 5px auto;
`;

const BrandTextLogo = styled.img.attrs({
  src: waiter,
  alt: 'Brand text logo',
})`
  display: block;
  user-drag: none;
  user-select: none;
  width: 130px;
  height: auto;
  margin: auto;
`;

const CompanyTextLogo = styled.img.attrs({
  src: optimal,
  alt: 'Company logo',
})`
  user-drag: none;
  user-select: none;
  transition: 0.5s;
  opacity: 0.6;
  width: 140px;
  position: fixed;
  left: 30px;
  bottom: 30px;
  &:hover {
    transition: 0.5s;
    opacity: 1;
  }
`;

const VersionWrapper = styled.span`
  color: white;
  font-size: small;
  margin-top: 25px;
  position: relative;
  top: 10px;
  left: 36%;
`;

class AuthHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      submitAction: false,
      isSubmitting: false,
      buttonVide: true,
      isTime: false,
      error: false,
    };
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  submitForm = async e => {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
    });
    await this.props.signIn(
      this.state.username,
      this.state.password,
      () => {
        this.setState({
          isSubmitting: false,
        });
        setTimeout(() => {
          this.setState({ isTime: true });
        }, 3000);
      },
      () => {
        this.setState({
          isSubmitting: false,
          error: true,
        });
        setTimeout(() => {
          this.setState({ isTime: true });
        }, 3000);
      }
    );
  };

  handleChange = event => {
    this.setState({ submitAction: true, error: false });
    this.setState({
      [event.target.id]: event.target.value,
    });
    if (this.state.username !== '' && this.state.password !== '') {
      this.setState({ buttonVide: false });
    }
  };

  render() {
    return (

        <Container>
          <BrandImageLogo />
          <BrandTextLogo />
          <br />
          <Card>
            <form onSubmit={this.submitForm}>
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <Input
                    id="username"
                    fullWidth
                    value={this.state.username}
                    onChange={this.handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircleTwoTone />
                      </InputAdornment>
                    }
                  />
                  {this.state.username === '' && this.state.submitAction && (
                    <FormHelperText
                      style={{
                        color: 'orange',
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                      error
                    >
                      <WarningTwoTone style={{ fontSize: 14 }} />
                      <span style={{ paddingLeft: 5 }}>This field is required!</span>
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <InputLabel htmlFor="password">&nbsp; Password</InputLabel>
                  <Input
                    id="password"
                    fullWidth
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <LockTwoTone />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                          {this.state.showPassword ? <VisibilityOffTwoTone /> : <VisibilityTwoTone />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {this.state.password === '' && this.state.submitAction && (
                    <FormHelperText
                      style={{
                        color: 'orange',
                        fontSize: 12,
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                      error
                    >
                      <WarningTwoTone style={{ fontSize: 12 }} />
                      <span style={{ paddingLeft: 5 }}>This field is required!</span>
                    </FormHelperText>
                  )}
                </FormControl>
              </CardContent>
              <CardActions>
                <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <Button
                    type="submit"
                    disabled={this.state.buttonVide || this.state.isSubmitting}
                    style={{
                      marginBottom: 10,
                      height: 50,
                      fontSize: '1em',
                    }}
                    variant="contained"
                    color="primary"
                  >
                    <svg
                      style={{
                        width: 16,
                        height: 'auto',
                        marginRight: 5,
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        // eslint-disable-next-line max-len
                        d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
                      />
                    </svg>
                    &nbsp; Sign-in
                  </Button>
                </div>
              </CardActions>
              {this.state.isSubmitting && <LinearProgress variant="query" style={{ height: 10, width: '100%' }} />}
              {!this.state.isTime && this.state.error === true && (
                <Alert variant="danger" titleCard="Authentication issues" textCard="You have entered an invalid username or password." />
              )}
            </form>
          </Card>
          <a
            style={{
              position: 'absolute',
              bottom: 30,
              left: 30,
              width: 140,
              height: 20,
              userDrag: 'none',
              userSelect: 'none',
            }}
            href="https://optimal.com.tn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CompanyTextLogo />
          </a>
        </Container>

    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
});

export default connect(
  mapStateToProps,
  {
    signIn,
  }
)(AuthHomePage);
