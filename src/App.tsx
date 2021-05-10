import { Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import './App.css'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  )
}

export default App
