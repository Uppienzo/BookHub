import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Context from '../../Context'
import './index.css'

const ReactSlick = props => {
  const {books} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {books.map(eachBook => {
          const {id, coverPic, authorName, title} = eachBook
          return (
            <Context.Consumer>
              {value => {
                const {onChangeRoute} = value
                const onClickLink = () => {
                  onChangeRoute('BOOK')
                }
                return (
                  <Link
                    to={`/books/${id}`}
                    className="styled-link"
                    key={id}
                    onClick={onClickLink}
                  >
                    <div className="slick-item-container" key={id}>
                      <img
                        className="logo-image"
                        src={coverPic}
                        alt="company logo"
                      />
                      <h1 className="slick-item-head">{authorName}</h1>
                      <p className="slick-item-title">{title}</p>
                    </div>
                  </Link>
                )
              }}
            </Context.Consumer>
          )
        })}
      </Slider>
    </div>
  )
}

export default ReactSlick
