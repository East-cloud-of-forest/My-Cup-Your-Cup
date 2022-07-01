import './HeaderComp.scss'
import { Logo, ButtonComp } from './index-comp/IndexComp'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect, useCallback } from 'react'
import classNames from 'classnames'
import CartPopUp from './Cart/CartPopUp'
import { Overlay, Popover } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { auth } from '../datasources/firebase'
import { loginUserModule } from '../modules/enteruser'

const Header = () => {
  const [searchActive, setSearchActive] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [mouseDown, setMouseDown] = useState(false)

  const { user } = useSelector((a) => a.enteruser)

  // nav
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

  // 카트 팝업
  const { items } = useSelector((state) => state.cartReducer.items)
  const [cartshow, setCartshow] = useState(false)
  const [carttarget, setCarttarget] = useState(null)
  const cartRef = useRef(null)
  const onCart = (e) => {
    setCartshow(!cartshow)
    setCarttarget(e.target)
  }

  // 유저 팝업
  const infoRef = useRef(null)
  const [userInfo, setUserInfo] = useState(false)
  const [userInfotarget, setUserInfotarget] = useState(null)
  const onUserInfo = (e) => {
    setUserInfo(!userInfo)
    setUserInfotarget(e.target)
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

  const [sidebarCartActive, setSidebarCartActive] = useState(false)
  const [sidebarCartActiveClass, setSidebarCartActiveClass] = useState(false)
  const onCartSidebar = () => {
    setSidebarCartActive(true)
    setTimeout(() => {
      setSidebarCartActiveClass(true)
    })
  }
  const offCartSidebar = () => {
    setSidebarCartActiveClass(false)
    setTimeout(() => {
      setSidebarCartActive(false)
    }, 300)
  }

  // 로그아웃
  const dispatch = useDispatch()
  const loginUser = useCallback((user) => dispatch(loginUserModule(user)), [
    dispatch,
  ])
  const logout = () => {
    auth.signOut()
    loginUser(null)
    navi('/')
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
      setSidebarCartActive(false)
      setSidebarCartActiveClass(false)
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
                  {user ? (
                    <div className="login_on">
                      <li>
                        <div className="user_img">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="user_icon" />
                          ) : (
                            <div className="user_svg">
                              <FontAwesomeIcon icon={solid('user')} size="4x" />
                            </div>
                          )}
                        </div>
                      </li>
                      <li>
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                      </li>
                      <li>
                        <ButtonComp color="white" onClick={offSidebar}>
                          마이페이지
                        </ButtonComp>
                      </li>
                      <li>
                        <Link to="/mydesign" onClick={offSidebar}>
                          <ButtonComp color="white">마이디자인</ButtonComp>
                        </Link>
                      </li>
                      <li>
                        <ButtonComp
                          color="white"
                          onClick={() => {
                            offSidebar()
                            logout()
                          }}
                        >
                          로그아웃
                        </ButtonComp>
                      </li>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
                    <FontAwesomeIcon icon={solid('magnifying-glass')} />
                  </ButtonComp>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* 헤더 */}
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
            <div ref={cartRef}>
              <ButtonComp icon style={{ width: '45px' }} onClick={onCart}>
                <FontAwesomeIcon icon={solid('cart-shopping')} size="2x" />
              </ButtonComp>

              <Overlay
                show={cartshow}
                target={carttarget}
                placement="bottom"
                container={cartRef}
                containerPadding={20}
                rootClose
                onHide={() => setCartshow(false)} // 바깥클릭시 창닫힘
              >
                <Popover id="cart_popup" className="cartpopover">
                  <CartPopUp openCartPop={onCart} />
                </Popover>
              </Overlay>
            </div>
          </li>
          <li>
            {user !== null ? (
              <div ref={infoRef}>
                <ButtonComp icon style={{ width: '45px' }} onClick={onUserInfo}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="user_icon" />
                  ) : (
                    <div className="user_svg">
                      <FontAwesomeIcon icon={solid('user')} size="2x" />
                    </div>
                  )}
                </ButtonComp>

                <Overlay
                  show={userInfo}
                  target={userInfotarget}
                  placement="bottom"
                  container={infoRef}
                  rootClose
                  onHide={() => setUserInfo(false)} // 바깥클릭시 창닫힘
                >
                  <Popover className="acount_nav">
                    <div className="user_img">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="user_icon" />
                      ) : (
                        <div className="user_svg">
                          <FontAwesomeIcon icon={solid('user')} size="4x" />
                        </div>
                      )}
                    </div>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                    <hr />
                    <ButtonComp color="white">마이페이지</ButtonComp>
                    <Link to="/mydesign">
                      <ButtonComp color="white">마이디자인</ButtonComp>
                    </Link>
                    <ButtonComp color="white" onClick={logout}>
                      로그아웃
                    </ButtonComp>
                  </Popover>
                </Overlay>
              </div>
            ) : (
              <>
                <Link to="/enteruser/login">
                  <ButtonComp icon style={{ width: '45px' }}>
                    <FontAwesomeIcon icon={solid('user')} size="2x" />
                  </ButtonComp>
                </Link>
              </>
            )}
          </li>
        </ul>
      </div>

      {/* 카트 사이드바 */}
      <div className="app_bar_cart">
        <div className="caption">
          <ButtonComp icon style={{ width: '45px' }} onClick={onCartSidebar}>
            <FontAwesomeIcon icon={solid('cart-shopping')} size="2x" />
          </ButtonComp>
        </div>
        {sidebarCartActive ? (
          <div
            className={classNames(
              'app_side_bar_background',
              sidebarCartActiveClass ? 'app_side_bar_background_active' : null,
            )}
            onClick={(e) => {
              e.target === e.currentTarget && offCartSidebar()
            }}
          >
            <div className="app_side_bar"></div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
