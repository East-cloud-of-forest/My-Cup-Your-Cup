import './HeaderComp.scss'
import { Logo, ButtonComp } from './index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header id="App_header" className="text-center">
      <Link to="/">
        <Logo style={{ width: '80px', margin: '1rem 1.5rem' }} />
      </Link>
      <nav id="App_nav">
        <ul className="nav">
          <li>
            <NavLink to="/create">주문제작</NavLink>
          </li>
          <li>
            <NavLink to="/">잔디자인</NavLink>
          </li>
          <li>
            <NavLink to="/">포토리뷰</NavLink>
          </li>
          <li>
            <NavLink to="/">제품문의</NavLink>
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
