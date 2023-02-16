import './index.css'
import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import Context from '../../Context'

const Book = props => {
  const {details} = props
  const {id, authorName, coverPic, title, readStatus, rating} = details
  return (
    <Context.Consumer>
      {value => {
        const {onChangeRoute} = value
        const onClickRoute = () => {
          onChangeRoute('BOOKS')
        }
        return (
          <Link
            to={`/books/${id}`}
            className="styled-link-book-item"
            onClick={onClickRoute}
          >
            <li className="book-container">
              <div className="cover-pic">
                <img
                  src={coverPic}
                  alt={title}
                  className="book-cover-main-image"
                />
              </div>

              <div className="book-details-container">
                <h1 className="book-title"> {title} </h1>
                <p className="book-author-name"> {authorName} </p>
                <p className="book-rating">
                  Avg Rating <BsFillStarFill className="star-icon-main" />
                  <span className="rating-number"> {rating} </span>
                </p>
                <p className="book-status">
                  Status:
                  <span className="book-status-highlight"> {readStatus}</span>
                </p>
              </div>
            </li>
          </Link>
        )
      }}
    </Context.Consumer>
  )
}

export default Book
