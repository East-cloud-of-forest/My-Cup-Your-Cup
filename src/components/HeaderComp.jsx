import './HeaderComp.scss'
import { Logo, ButtonComp } from './index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header id="App_header" className="text-center">
      <Link to="/">
        <Logo style={{ width: '80px', margin: '1rem 1.5rem' }} />
      </Link>
      <nav id="App_nav">
        <ul className="body">
          <li>
            <Link to="/">주문제작</Link>
          </li>
          <li>
            <Link to="/">잔디자인</Link>
          </li>
          <li>
            <Link to="/">포토리뷰</Link>
          </li>
          <li>
            <Link to="/">제품문의</Link>
          </li>
        </ul>
      </nav>
      <div id="App_subnav">
        <ul id="main_subnav" className="caption">
          <li>
            <ButtonComp icon>
              <FontAwesomeIcon icon={solid('magnifying-glass')} size="2x" />
            </ButtonComp>
          </li>
          <li>
            <ButtonComp icon>
              <FontAwesomeIcon icon={solid('cart-shopping')} size="2x" />
            </ButtonComp>
          </li>
          <li>
            <Link to="/Login">
              <ButtonComp icon>
                <FontAwesomeIcon icon={solid('user')} size="2x" />
              </ButtonComp>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
