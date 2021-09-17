import React, { FC } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Schedule from './components/pages/schedule'
import SignIn from './components/pages/signIn'

const App: FC = () => {
   return (
      <Router>
         <Switch>
            <Route exact path="/">
               <SignIn />
            </Route>
            <Route exact path="/schedule">
               <Schedule />
            </Route>
            <Route>
               <NoMatch />
            </Route>
         </Switch>
      </Router>
   )
}

export default App

const NoMatch = () => <h2>Not Found</h2>
