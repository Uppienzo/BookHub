import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Load from '../Loader'
import Header from '../Header'
import Footer from '../Footer'
import ReactSlick from '../ReactSlick'
import Context from '../../Context'
import FailureView from '../AuthenticationFailure'

const apiFetchConstantStates = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'lOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {topRatedBooks: [], apiStatus: apiFetchConstantStates.initial}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiFetchConstantStates.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
      title: each.title,
    }))
    this.setState({
      topRatedBooks: updatedBooks,
      apiStatus: apiFetchConstantStates.success,
    })
  }

  slickContainer = () => {
    const {topRatedBooks} = this.state
    return (
      <>
        <ReactSlick books={topRatedBooks} />
      </>
    )
  }

  displayServerData = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiFetchConstantStates.loading:
        return <Load />
      case apiFetchConstantStates.success:
        return this.slickContainer()
      case apiFetchConstantStates.failure:
        return <FailureView reload={this.getTopRatedBooks} />
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Home-container">
        <Header />
        <div className="home-body-container">
          <h1 className="home-body-head">Find Your Next Favorite Books?</h1>
          <p className="home-body-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>

          <div className="slick-container">
            <div className="slick-header-container">
              <h1 className="slick-head">Top Rated Books</h1>
              <Context.Consumer>
                {value => {
                  const {onChangeRoute} = value
                  const onClickLink = () => {
                    onChangeRoute('BOOKSHELVES')
                  }
                  return (
                    <Link to="/shelf">
                      <button
                        type="button"
                        className="Find-books-button"
                        onClick={onClickLink}
                      >
                        Find Books
                      </button>
                    </Link>
                  )
                }}
              </Context.Consumer>
            </div>
            {this.displayServerData()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
