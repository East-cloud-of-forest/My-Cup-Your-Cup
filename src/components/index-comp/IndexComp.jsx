import './IndexComp.scss'
import classNames from 'classnames'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export const CustomButton = (props) => {
  const { children, size } = props
  return <button className={classNames('button', size)}>{children}</button>
}

export const SliderComp = ({
  dots,
  infinite,
  speed,
  slidesToShow,
  slidesToScroll,
  arrows,
  autoplay,
  children,
}) => {

  const NextArrow = ({ style, onClick }) => {
    return (
      <div className='customarrow arrow-next' style={{ ...style }} onClick={onClick}>
        <FontAwesomeIcon icon={solid('caret-right')} size="3x" />
      </div>
    )
  }

  const PrevArrow = ({ style, onClick }) => {
    return (
      <div className='customarrow arrow-prev' style={{ ...style }} onClick={onClick}>
        <FontAwesomeIcon icon={solid('caret-left')} size="3x" />
      </div>
    )
  }

  const settings = {
    dots: dots,
    infinite: infinite,
    speed: speed,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    arrows: arrows,
    autoplay: autoplay,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

SliderComp.defaultProps = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
}
