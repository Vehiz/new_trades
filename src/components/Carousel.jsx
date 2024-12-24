// import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PropTypes from 'prop-types'

const Carousel = ({
  data,
  dotClass,
  arrowClass,
  arrowColor = 'rgb(115, 73, 242)',
  dotColor = 'rgb(115, 73, 242)',
}) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow arrowClass={arrowClass} color={arrowColor} />,
    prevArrow: <PrevArrow arrowClass={arrowClass} color={arrowColor} />,
    appendDots: (dots) => (
      <ul className={dotClass} style={{ color: dotColor }}>
        {dots}
      </ul>
    ),
  }
  Carousel.propTypes = {
    data: PropTypes.bool.isRequired,
    dotClass: PropTypes.func.isRequired,
    arrowClass: PropTypes.string.isRequired,
    arrowColor: PropTypes.string.isRequired,
    dotColor: PropTypes.string.isRequired,
  };
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index} className="carousel-slide">
            <img src={item.image} alt={item.title} className="carousel-image" />
            <div className="carousel-controls">
              <h3 className="p-0 text-[1rem] leading-6 max-w-[80%] font-[500] transition-colors duration-250 ease-linear">
                {item.title}
              </h3>
              <p className="pt-[0.5rem] max-h-[100%] opacity-1 text-[1rem] font-[400] leading-[1.5rem] m-0">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

const NextArrow = ({ arrowClass, color, onClick }) => (
  <div
    className={`carousel-arrow carousel-next ${arrowClass}`}
    onClick={onClick}
    style={{ borderColor: color }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M4.16797 10H15.8346"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 4.16797L15.8333 10.0013L10 15.8346"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

NextArrow.propTypes = {
    arrowClass: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
  };
const PrevArrow = ({ arrowClass, color, onClick }) => (
  <div
    className={`carousel-arrow carousel-prev ${arrowClass}`}
    onClick={onClick}
    style={{ borderColor: color }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M15.8337 10H4.16699"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0003 15.8346L4.16699 10.0013L10.0003 4.16797"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

PrevArrow.propTypes = {
    arrowClass: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
  };

export default Carousel
