import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMessage: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onPostLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successfulLogin(data.jwt_token)
    } else {
      this.setState({isError: true, errorMessage: data.error_msg})
    }
  }

  successfulLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({isError: false, errorMessage: ''})
    const {history} = this.props
    history.replace('/')
  }

  formContainer = () => {
    const {username, password, isError, errorMessage} = this.state
    return (
      <form className="form-container" onSubmit={this.onPostLoginForm}>
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dh38irai9/image/upload/v1675064153/Ellipse_99_boz7hr.png"
            alt="website login"
            className="website-login-image"
          />
          <img
            src="https://res.cloudinary.com/dh38irai9/image/upload/v1675064361/Group_7732_xv1vle.png"
            alt="login website logo"
            className="website-login-logo"
          />
        </div>

        <div className="inputs-container">
          <label className="label" htmlFor="username">
            Username*
          </label>
          <input
            type="text"
            id="username"
            className="input"
            placeholder="Enter Username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <label className="label" htmlFor="password">
            Password*
          </label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="Enter Password"
            password={password}
            onChange={this.onChangePassword}
          />
          {isError && <p className="error-msg-para"> {errorMessage} </p>}
          <button type="submit" className="login-submit-button">
            Login
          </button>
        </div>
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-image-container">
          <img
            src="https://res.cloudinary.com/dh38irai9/image/upload/v1675070597/Rectangle_1467_z1bplz.png"
            alt="website login"
            className="website-login-large"
          />
        </div>

        <div className="form-box-container">{this.formContainer()}</div>
      </div>
    )
  }
}

export default Login
