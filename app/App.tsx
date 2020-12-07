import React from 'react'
import {Helmet} from 'react-helmet-async'
import AppNavbar from './AppNavbar'
import AppMain from './AppMain'

const App = () => (
<React.Fragment>
  <Helmet>
    <title>Theatre Points Lookup</title>
  </Helmet>
  <div>
      <AppNavbar />
      <AppMain />
  </div>
</React.Fragment>
)
export default App