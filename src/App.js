import React from 'react';
import { Route, Switch } from "react-router-dom"

import HomePage from "./pages/homepage/homepage.component"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import SignIn from "./pages/sign-in-and-sign-out/sign-in-and-sign-out.component"

import { auth } from "./firebase/firebase.utils"

import "./App.css"

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unSubstribeFromAuth = null

  componentDidMount () {
    this.unSubstribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})
      
      console.log(user)
    })
  }

  componentWillUnmount () {
    this.unSubstribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route path="/signin" component={SignIn}/>
        </Switch>
      </div>
    )
  }
}

export default App;
