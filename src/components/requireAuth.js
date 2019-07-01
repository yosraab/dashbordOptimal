
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthHomePage from '../pages/AuthHomePage';
export default function(ComposedComponent) {
    class Authentication extends Component {
        render() {
            const { auth: log } = this.props;
            if (log.token) {
                return <ComposedComponent {...this.props} />;
            }
            return <AuthHomePage />;
        }
    }
    const mapStateToProps = ({ auth }) => ({ auth });

    return connect(mapStateToProps)(Authentication);
}
