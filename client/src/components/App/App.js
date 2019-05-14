import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Profile from '../App/Pages/Profile/Profile'
import AddRecipe from './Pages/Profile/AddRecipe/AddRecipe'
import Recipe from './Pages/Profile/Recipe/Recipe'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import PrivateRoute from '../HOCs/PrivateRoute'
import './main.css'

class App extends Component {
  state = {
    auth: localStorage.getItem('sessionID'),
    user: {},
    loading: true
  }

  async getCurrentUser() {
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

  componentDidMount() {
    this.getCurrentUser()
  }

  render() {
    return (
      <Router>
        <div className="wrapper">
          <Header {...this.state} />
          <div className="page-body">
            <section className="section">
              <div className="container is-fluid">
                <div className="columns">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <PrivateRoute exact path="/profile" {...this.state} component={Profile} />
                    <PrivateRoute exact path="/profile/recipe" {...this.state} component={AddRecipe} />
                    <PrivateRoute exact path="/profile/recipe/:id" {...this.state} component={Recipe} />
                  </Switch>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
