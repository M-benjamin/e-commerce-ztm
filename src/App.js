import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import { createStructuredSelector } from 'reselect';

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CkeckOutPage from "./pages/checkout/checkout.component"

import Header from "./components/header/header.component";
//import SignIn from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from './redux/user/user.action'
import { selectCurrentUser } from "./redux/user/user.selectors"

import "./App.css";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component";

class App extends React.Component {
  unSubstribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unSubstribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unSubstribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/ckeckout" component={CkeckOutPage} />
          <Route path="/signin" render={() => this.props.currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUpPage />) } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps) (App);
