import Schedule from '@components/pages/schedule'
import SignIn from '@components/pages/signIn'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App: React.FC = () => {
   return (
      <Router>
         <Route path="/login">
            <Schedule />
         </Route>
         <Route path="/schedule">
            <SignIn />
         </Route>
      </Router>
   )
}

export default App
