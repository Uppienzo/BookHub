import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import BookShelves from './components/BookShelves'
import BookDetails from './components/BookDetails'
import Context from './Context'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  state = {activeRoute: 'HOME'}

  onChangeRoute = activeRoute => {
    this.setState({activeRoute})
  }

  render() {
    const {activeRoute} = this.state
    return (
      <Context.Provider
        value={{activeRoute, onChangeRoute: this.onChangeRoute}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
