import './HeaderComp.scss'
import { Logo, ButtonComp } from './index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  const a = ['주문제작']
  console.log(a[0][0])
  const navlink = [
    {
      name: '주문제작',
      path: '/create'
    },
    {
      name: '잔디자인',
      path: '/test1'
    },
    {
      name: '포토리뷰',
      path: '/test2'
    },
    {
      name: '제품문의',
      path: '/test3'
    },
  ]

  return (
    <header id="App_header" className="text-center">
      <Link to="/">
        <Logo style={{ width: '80px', margin: '1rem 1.5rem' }} />
      </Link>
      <nav id="App_nav">
        <ul className="nav">
          {
            navlink.map(e=>(
              <li>
                <NavLink to={e.path} key={e.name}
                  activeClassName
                >
                  {e.name.split("").map(a=>(
                    <span data-hover={a} key={a}>{a}</span>
                  ))}
                </NavLink>
              </li>
            ))
          }
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
