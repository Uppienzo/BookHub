import Cookies from 'js-cookie'
import {Component} from 'react'

import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import Load from '../Loader'

import './index.css'
import FailureView from '../AuthenticationFailure'

const apiFetchConstantStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'lOADING',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {bookData: '', apiStatus: apiFetchConstantStates.initial}

  componentDidMount() {
    this.getBookDetails()
  }

  getBookDetails = async () => {
    this.setState({apiStatus: apiFetchConstantStates.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successfulFetch(data.book_details)
    } else {
      this.setState({apiStatus: apiFetchConstantStates.failure})
    }
  }

  successfulFetch = bookDetails => {
    const updatedBookDetails = {
      aboutAuthor: bookDetails.about_author,
      aboutBook: bookDetails.about_book,
      authorName: bookDetails.author_name,
      coverPic: bookDetails.cover_pic,
      id: bookDetails.id,
      rating: bookDetails.rating,
      readStatus: bookDetails.read_status,
      title: bookDetails.title,
    }
    this.setState({
      bookData: updatedBookDetails,
      apiStatus: apiFetchConstantStates.success,
    })
  }

  profileView = () => {
    const {bookData} = this.state
    const {authorName, coverPic, rating, readStatus, title} = bookData
    return (
      <div className="book-profile-container">
        <img src={coverPic} alt={title} className="book-cover-image" />
        <div className="book-profile-description">
          <h1 className="book-profile-title"> {title} </h1>
          <p className="book-profile-author-name"> {authorName} </p>
          <p className="book-profile-rating">
            Avg Rating <BsFillStarFill className="star-icon" />
            <span className="rating-profile-number"> {rating} </span>
          </p>
          <p className="book-profile-status">
            Status :{' '}
            <span className="book-profile-status-highlight">{readStatus}</span>
          </p>
        </div>
      </div>
    )
  }

  bookDescriptionView = () => {
    const {bookData} = this.state
    const {aboutAuthor, aboutBook} = bookData
    return (
      <div className="book-description-container">
        <h1 className="book-description-head">About Author</h1>
        <p className="book-description-description"> {aboutAuthor} </p>
        <h1 className="book-description-head">About Book</h1>
        <p className="book-description-description"> {aboutBook} </p>
      </div>
    )
  }

  bookDetailsView = () => (
    <>
      <div className="book-details-card">
        {this.profileView()}
        <hr className="horizontal-line" />
        {this.bookDescriptionView()}
      </div>
      <Footer />
    </>
  )

  resultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiFetchConstantStates.loading:
        return <Load />
      case apiFetchConstantStates.success:
        return this.bookDetailsView()
      case apiFetchConstantStates.failure:
        return <FailureView reload={this.getBookDetails} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-details-main-container">
        <Header />
        {this.resultView()}
      </div>
    )
  }
}

export default BookDetails
