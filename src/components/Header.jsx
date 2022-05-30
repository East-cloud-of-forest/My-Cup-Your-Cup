import './Header.scss'
import { Logo } from './index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header id="App_header" className="text-center">
      <Link to="/">
        <Logo style={{ width: '80px', margin: '1rem 1.5rem' }}></Logo>
      </Link>
      <nav id="App_nav">
        <ul>
          <li>
            <p>제작</p>
          </li>
          <li>
            <p>모두의 디자인</p>
          </li>
          <li>
            <p>리뷰</p>
          </li>
          <li>
            <p>문의하기</p>
          </li>
        </ul>
      </nav>
      <div>
        <ul id="main_subnav" className="caption">
          <li>
            <FontAwesomeIcon icon={solid('magnifying-glass')} size="2x" />
          </li>
          <li>
            <FontAwesomeIcon icon={solid('cart-shopping')} size="2x" />
          </li>
          <li>
            <FontAwesomeIcon icon={solid('user')} size="2x" />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
