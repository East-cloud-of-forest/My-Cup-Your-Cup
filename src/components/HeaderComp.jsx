import './HeaderComp.scss'
import { Logo, ButtonComp } from './index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import CartPopUp from './Cart/CartPopUp'
import { Overlay, Popover } from 'react-bootstrap'
import { useSelector } from 'react-redux/es/exports'

const Header = () => {
  const [searchActive, setSearchActive] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [mouseDown, setMouseDown] = useState(false)
  // 팝업
  const { items } = useSelector((state) => state.cartReducer.items)
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)

  const navi = useNavigate()
  const searchInput = useRef()
  const navlink = [
    {
      name: '주문제작',
      path: '/create',
    },
    {
      name: '잔디자인',
      path: '/design',
    },
    {
      name: '포토리뷰',
      path: '/review',
    },
    {
      name: '제품문의',
      path: '/QnAmenu/FaqPage',
    },
  ]

  // 검색창 입력
  const onChange = (e) => {
    setSearchKeyword(e.target.value)
  }
  // 검색창 열렸을때 검색버튼 클릭시 검색창 active 변화 방지
  const onMouseDown = () => {
    setMouseDown(true)
  }
  const onMouseUp = () => {
    setMouseDown(false)
  }
  // focus 해제시에 검색창 닫힘
  const onBlur = () => {
    mouseDown ? setSearchActive(true) : setSearchActive(false)
  }
  // 검색버튼 클릭
  const searchClick = () => {
    if (searchActive) {
      setSearchActive(false)
      searchInput.current.blur()
      navi('/search?keyword=' + searchKeyword)
      setSearchKeyword('')
    } else {
      setSearchActive(true)
      searchInput.current.focus()
    }
  }
  // 검색 엔터
  const onSubmit = (e) => {
    searchClick()
    e.preventDefault()
  }

  // 팝업 열기
  const handleClick = (e) => {
    setShow(!show)
    setTarget(e.target)
  }

  // 사이드 바
  const [sidebarActive, setSidebarActive] = useState(false)
  const [sidebarActiveClass, setSidebarActiveClass] = useState(false)
  const onSidebar = () => {
    setSidebarActive(true)
    setTimeout(() => {
      setSidebarActiveClass(true)
    })
  }
  const offSidebar = () => {
    setSidebarActiveClass(false)
    setTimeout(() => {
      setSidebarActive(false)
    }, 300)
  }
  // 리사이즈 감지 및 sidebar 초기화
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerWidth,
  })
  useEffect(() => {
    let resizeTimer
    let windowSizer = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setWindowSize({
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        })
      }, 300)
    }
    window.addEventListener('resize', windowSizer)
    // 지정한 px 이상에서 실행될 함수
    if (windowSize.width + 17 > 993) {
      setSidebarActiveClass(false)
      setSidebarActive(false)
    }
    ////////////////////////////////
    return () => {
      window.removeEventListener('resize', windowSizer)
    }
  }, [windowSize])
  const onSideSearch = (e) => {
    e.preventDefault()
    navi('/search?keyword=' + searchKeyword)
    setSearchKeyword('')
    offSidebar()
  }

  return (
    <header id="App_header" className="text-center">
      {/* 사이드 바 */}
      <div className="app_bar">
        <ButtonComp icon style={{ width: '45px' }} onClick={onSidebar}>
          <FontAwesomeIcon icon={solid('bars')} size="2x" />
        </ButtonComp>
        {sidebarActive ? (
          <div
            className={classNames(
              'app_side_bar_background',
              sidebarActiveClass ? 'app_side_bar_background_active' : null,
            )}
            onClick={(e) => {
              e.target === e.currentTarget && offSidebar()
            }}
          >
            <div className="app_side_bar">
              <div>
                <ul className="account">
                  <li>
                    <Link to="/enteruser/login" onClick={offSidebar}>
                      <ButtonComp color="white">
                        <FontAwesomeIcon icon={solid('right-to-bracket')} />
                        로그인
                      </ButtonComp>
                    </Link>
                  </li>
                  <li>
                    <Link to="/enteruser/agree" onClick={offSidebar}>
                      <ButtonComp color="white">
                        <FontAwesomeIcon icon={solid('user-plus')} />
                        회원가입
                      </ButtonComp>
                    </Link>
                  </li>
                </ul>
                <hr />
                <ul className="side_nav">
                  {navlink.map((e, i) => (
                    <li key={i}>
                      <NavLink
                        to={e.path}
                        activeclassname="true"
                        onClick={offSidebar}
                      >
                        <ButtonComp color="white">
                          {e.name}
                          <FontAwesomeIcon icon={solid('caret-left')} />
                        </ButtonComp>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={classNames('search', searchActive && 'active')}>
                <form onSubmit={onSideSearch}>
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={onChange}
                    ref={searchInput}
                  />
                </form>
                <div>
                  <ButtonComp
                    icon
                    style={{ width: '45px' }}
                    onClick={onSideSearch}
                  >
                    <FontAwesomeIcon
                      icon={solid('magnifying-glass')}
                    />
                  </ButtonComp>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <Link to="/">
        <Logo style={{ width: '80px', margin: '1rem 1.5rem' }} />
      </Link>
      <nav id="App_nav">
        <ul className="nav">
          {navlink.map((e, i) => (
            <li key={i}>
              <NavLink to={e.path} activeclassname="true">
                {e.name.split('').map((a, i) => (
                  <span data-hover={a} key={i}>
                    {a}
                  </span>
                ))}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div id="App_subnav">
        <ul id="main_subnav" className="caption">
          <li>
            <div className={classNames('search', searchActive && 'active')}>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={searchKeyword}
                  onBlur={onBlur}
                  onChange={onChange}
                  ref={searchInput}
                />
              </form>
              <div onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                <ButtonComp
                  icon
                  style={{ width: '45px' }}
                  onClick={searchClick}
                >
                  <FontAwesomeIcon icon={solid('magnifying-glass')} size="2x" />
                </ButtonComp>
              </div>
            </div>
          </li>
          <li>
            <div ref={ref}>
              <ButtonComp icon style={{ width: '45px' }} onClick={handleClick}>
                <FontAwesomeIcon icon={solid('cart-shopping')} size="2x" />
              </ButtonComp>
              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
                rootClose
                onHide={() => setShow(false)} // 바깥클릭시 창닫힘
              >
                <Popover id="cart_popup">
                  <CartPopUp openCartPop={handleClick} />
                </Popover>
              </Overlay>
            </div>
          </li>
          <li>
            <Link to="/enteruser/login">
              <ButtonComp icon style={{ width: '45px' }}>
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
