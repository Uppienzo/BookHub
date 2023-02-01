import './index.css'
import {Link} from 'react-router-dom'
import Context from '../../Context'

const NavItem = props => {
  const {details} = props
  const {id, path, label} = details
  return (
    <Context.Consumer>
      {value => {
        const {activeRoute, onChangeRoute} = value
        const routeChange = () => {
          onChangeRoute(id)
        }
        const isActive = activeRoute === id
        const ActiveClassName = isActive ? 'active' : ''
        console.log(isActive, activeRoute, id)
        return (
          <Link to={path} className="styled-link" onClick={routeChange}>
            <li className={`nav-item ${ActiveClassName}`}>
              <p>{label}</p>
            </li>
          </Link>
        )
      }}
    </Context.Consumer>
  )
}

export default NavItem
