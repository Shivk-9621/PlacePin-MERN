import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Users from './Users/Pages/Users'
import NewPlaces from './Places/Pages/NewPlace'
import './App.css'

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path='/' exact >
          <Users />
        </Route>

        <Route path='/places/new' exact >
          <NewPlaces />
        </Route>

        <Redirect to='/' />
      </Switch>
    </Router>
  )
}

export default App
