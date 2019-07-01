import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthHomePage from '../src/pages/AuthHomePage';
import Layout from './pages/Layout';
import requireAuth from "./components/requireAuth";
import { styles } from './components/Commun/styles';
import Produits from "./pages/produits/Produits";
import Categories from "./pages/produits/Categories";
import FamilyCateg from "./pages/produits/FamilyCateg";
import Paniers from "./pages/paniers/paniers";
import Candidatures from "./pages/candidatures/candidatures";
import Customers from "./pages/clients/clients";
import SettingsPage from "./pages/settings/SettingsPage";
class Routes extends Component {
    render() {
        return (
            <main style={styles.main}>
                <Layout />
                <section style={styles.content}>
                    <Route exact path="/family" component={FamilyCateg} />
                    <Route path="/family/:categName" component={Categories} />
                    <Route path="/category/:productName" component={Produits} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/candidatures" component={Candidatures} />
                    <Route path="/paniers" component={Paniers} />
                    <Route path="/settings" component={SettingsPage} />
                </section>
            </main>
        );
    }
}

const mapStateToProps = ({ auth: { user } }) => ({ user });
const mapDispatchToProps = {
};
const connectToStore = connect(
    mapStateToProps,
    mapDispatchToProps
);

export const ProtectedRoutes = R.compose(
    requireAuth,
    connectToStore
)(Routes);


export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoutes />
                <Route exact path="/" component={AuthHomePage} />
            </Switch>
        </BrowserRouter>
    );
}
