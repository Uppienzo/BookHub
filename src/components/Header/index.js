import './index.css'
import {HiOutlineMenu} from 'react-icons/hi'
import Popup from 'reactjs-popup'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import NavItem from '../NavItem'
import Context from '../../Context'

const navItemsList = [
  {
    id: 'HOME',
    path: '/',
    label: 'Home',
  },
  {
    id: 'BOOKSHELVES',
    path: '/shelf',
    label: 'BookShelves',
  },
]

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const HeadNavBar = () => (
    <ul className="head-nav-bar">
      {navItemsList.map(each => (
        <NavItem details={each} key={each.id} />
      ))}

      <li className="nav-item">
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </li>
    </ul>
  )

  const reactPopUp = () => (
    <>
      <HiOutlineMenu className="menu" />
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button">
            <HiOutlineMenu />
          </button>
        }
      >
        {close => (
          <>
            <div className="popup-box">
              <ul className="head-nav-bar-small">
                {navItemsList.map(each => (
                  <NavItem details={each} key={each.id} />
                ))}
                <li className="nav-item">
                  <button
                    type="button"
                    className="logout-button"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    <AiFillCloseCircle />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </Popup>
    </>
  )
  return (
    <div className="header-container">
      <Context.Consumer>
        {value => {
          const {onChangeRoute} = value
          const onClickLink = () => {
            onChangeRoute('HOME')
          }
          return (
            <Link to="/" className="styled-link" onClick={onClickLink}>
              <img
                src="https://res.cloudinary.com/dh38irai9/image/upload/v1675269848/Group_7732_1_x6q6aj.png"
                alt="website logo"
                className="header-website-logo"
              />
            </Link>
          )
        }}
      </Context.Consumer>
      <HeadNavBar />

      {reactPopUp()}
    </div>
  )
}

export default withRouter(Header)
