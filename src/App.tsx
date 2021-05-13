import { Switch, Route } from 'react-router-dom'

import Login from './components/Login'
import './App.css'
import Header from './components/Header'
import { AuthProvider } from './context/Auth'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </AuthProvider>
    </div>
  )
}

export default App
