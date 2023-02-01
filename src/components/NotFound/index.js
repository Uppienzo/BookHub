import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dh38irai9/image/upload/v1675059254/Group_7484_eujdmo.png"
      alt="not found"
      className="not-found-image"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/" className="styled-link">
      <button type="button" className="go-back-to-home-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
