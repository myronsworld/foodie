import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import Footer from './Footer'
import Profile from './profile/Profile'
import AddRecipe from './profile/childComponents/AddRecipe/AddRecipe'
import Home from './Home'
import About from './About'
import PrivateRoute from '../HOCs/PrivateRoute'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: localStorage.getItem('sessionID'),
      user: {},
      loading: true
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/current_user')

      if (res) {
        this.setState(() => ({ auth: res.data._id }))
        this.setState(() => ({ user: res.data }))
        localStorage.setItem('sessionID', res.data._id)
        this.setState(() => ({ loading: false }))
      }
    } catch (e) {
      this.setState(() => ({ auth: false }))
      localStorage.removeItem('sessionID')
      console.log(e)
    }
  }

  render() {
    return (
      <Router>
        <Header {...this.state} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/profile" {...this.state} component={Profile} />
          <PrivateRoute exact path="/profile/recipe" {...this.state} component={AddRecipe} />
        </Switch>
        <Footer />
      </Router>
    )
  }
}

export default App
