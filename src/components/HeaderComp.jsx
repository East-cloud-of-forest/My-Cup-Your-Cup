import "./HeaderComp.scss";
import { Logo, ButtonComp } from "./index-comp/IndexComp";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import CartPopUp from "./Cart/CartPopUp";
import { Overlay, Popover } from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import { useMemo } from "react";


const Header = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mouseDown, setMouseDown] = useState(false);
  // 팝업
  const {items} = useSelector( (state)=>state.cartReducer.items );
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const navi = useNavigate();
  const searchInput = useRef();
  const navlink = [
    {
      name: "주문제작",
      path: "/create",
    },
    {
      name: "잔디자인",
      path: "/design",
    },
    {
      name: "포토리뷰",
      path: "/review",
    },
    {
      name: "제품문의",
      path: "/QnAmenu/FaqPage",
    },
  ];

  // 검색창 입력
  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  // 검색창 열렸을때 검색버튼 클릭시 검색창 active 변화 방지
  const onMouseDown = () => {
    setMouseDown(true);
  };
  const onMouseUp = () => {
    setMouseDown(false);
  };
  // focus 해제시에 검색창 닫힘
  const onBlur = () => {
    mouseDown ? setSearchActive(true) : setSearchActive(false);
  };
  // 검색버튼 클릭
  const searchClick = () => {
    if (searchActive) {
      setSearchActive(false);
      searchInput.current.blur();
      navi("/search?keyword=" + searchKeyword);
      setSearchKeyword("");
    } else {
      setSearchActive(true);
      searchInput.current.focus();
    }
  };
  // 검색 엔터
  const onSubmit = (e) => {
    searchClick()
    e.preventDefault();
  };
  // 팝업 열기
  const handleClick = (e) => {
    setShow(!show);
    setTarget(e.target);
  };
  const updatedItems = useMemo(() => {
    return items;
  })
  useEffect(()=> {
    setShow(!show)
  }, [updatedItems])

  return (
    <header id="App_header" className="text-center">
      <Link to="/">
        <Logo style={{ width: "80px", margin: "1rem 1.5rem" }} />
      </Link>
      <nav id="App_nav">
        <ul className="nav">
          {navlink.map((e, i) => (
            <li key={i}>
              <NavLink to={e.path} activeclassname="true">
                {e.name.split("").map((a, i) => (
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
            <div className={classNames("search", searchActive && "active")}>
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
                  style={{ width: "45px" }}
                  onClick={searchClick}
                >
                  <FontAwesomeIcon icon={solid("magnifying-glass")} size="2x" />
                </ButtonComp>
              </div>
            </div>
          </li>
          <li>
            <div ref={ref}>
              <ButtonComp icon style={{ width: "45px" }} onClick={handleClick}>
                <FontAwesomeIcon icon={solid("cart-shopping")} size="2x" />
              </ButtonComp>

              <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
                rootClose
                onHide={()=>setShow(false)} // 바깥클릭시 창닫힘
              >
                <Popover id="cart_popup">
                  <CartPopUp/> 
                </Popover>
              </Overlay>
            </div>
          </li>
          <li>
            <Link to="/enteruser/login">
              <ButtonComp icon style={{ width: "45px" }}>
                <FontAwesomeIcon icon={solid("user")} size="2x" />
              </ButtonComp>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
