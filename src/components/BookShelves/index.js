import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import './index.css'
import Shelf from '../BookShelvesItem'
import Book from '../Book'
import Footer from '../Footer'
import Header from '../Header'
import Load from '../Loader'
import FailureView from '../AuthenticationFailure'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiFetchConstantStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'lOADING',
  failure: 'FAILURE',
  noVideos: 'NO-VIDEOS',
}

class BookShelves extends Component {
  state = {
    books: [],
    activeShelf: bookshelvesList[0].value,
    searchInput: '',
    apiStatus: apiFetchConstantStates.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiFetchConstantStates.loading})
    const {activeShelf, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${searchInput}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successfulFetch(data.books)
    } else {
      this.setState({apiStatus: apiFetchConstantStates.failure})
    }
  }

  successfulFetch = books => {
    const updatedBooks = books.map(each => ({
      authorName: each.author_name,
      coverPic: each.cover_pic,
      id: each.id,
      rating: each.rating,
      readStatus: each.read_status,
      title: each.title,
    }))

    if (books.length === 0) {
      this.setState({apiStatus: apiFetchConstantStates.noVideos})
    } else {
      this.setState({
        books: updatedBooks,
        apiStatus: apiFetchConstantStates.success,
      })
    }
  }

  shiftShelf = shelfId => {
    const selectedShelf = bookshelvesList.find(each => each.id === shelfId)
    const activeShelf = selectedShelf.value
    this.setState({activeShelf}, this.getBooks)
  }

  shelvesContainer = () => {
    const {activeShelf} = this.state
    return (
      <div className="shelves-main-container">
        <h1 className="selves-head">Bookshelves</h1>
        <ul className="selves-container">
          {bookshelvesList.map(each => (
            <Shelf
              details={each}
              key={each.id}
              activeShelf={activeShelf}
              shiftShelf={this.shiftShelf}
            />
          ))}
        </ul>
      </div>
    )
  }

  noVideosView = () => {
    const {searchInput} = this.state
    return (
      <div className="no-videos-container">
        <img
          src="https://res.cloudinary.com/dh38irai9/image/upload/v1675174336/Asset_1_1_j1opz1.png"
          alt="no books"
          className="no-books-image"
        />
        <p className="no-videos-description">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  onchangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    if (searchInput.length > 0) {
      this.getBooks()
    }
  }

  booksSearchContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="books-search-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchInput}
          onChange={this.onchangeSearchInput}
        />
        <button
          type="button"
          className="search-icon-button"
          onClick={this.onClickSearchButton}
          testid="searchButton"
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  booksShelvesHeadContainer = () => {
    const {activeShelf} = this.state
    const selectedShelfObj = bookshelvesList.find(
      each => each.value === activeShelf,
    )
    const activeBooksType = selectedShelfObj.label
    return (
      <div className="book-shelves-head-container">
        <h1 className="books-type-head"> {activeBooksType} Books </h1>
        {this.booksSearchContainer()}
      </div>
    )
  }

  booksView = () => {
    const {books} = this.state
    return (
      <>
        <ul className="books-list">
          {books.map(eachBook => (
            <Book key={eachBook.id} details={eachBook} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  resultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiFetchConstantStates.loading:
        return <Load />
      case apiFetchConstantStates.success:
        return this.booksView()
      case apiFetchConstantStates.noVideos:
        return this.noVideosView()
      case apiFetchConstantStates.failure:
        return <FailureView reload={this.getBooks} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="book-shelves-main-container">
        <Header />
        <div className="books-shelves-body-container">
          {this.shelvesContainer()}
          <div className="books-result-container">
            {this.booksShelvesHeadContainer()}
            {this.resultView()}
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
