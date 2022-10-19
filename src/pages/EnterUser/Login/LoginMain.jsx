import { React, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginMain.scss";
import BrandButton from "../../../components/Login/BrandButton";
import SearchID from "../../../components/Login/SearchID/SearchID";
import SearchPassword from "../../../components/Login/SearchPassword/SearchPassword";
import { ButtonComp } from "../../../components/index-comp/IndexComp";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Googlelogo from "../../../components/Login/img/googleicon.svg";
import Facebooklogo from "../../../components/Login/img/facebookicon.svg";
import { loginUserModule } from "../../../modules/enteruser";
import {
  emailLogin,
  getFirebaseData,
  googleLoginPopup,
  saveLoginInfo,
  setFirebaseData,
} from "../../../datasources/firebase";
import { loadingEnd, loadingStart } from "../../../modules/loading";

const LoginMainPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navi = useNavigate();
  const startLoading = useCallback(() => dispatch(loadingStart()), [dispatch]);
  const endLoading = useCallback(() => dispatch(loadingEnd()), [dispatch]);

  // input 창 입력
  const inputEmail = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  // 로그인 모듈 dispatch
  const loginUser = useCallback(
    (user) => dispatch(loginUserModule(user)),
    [dispatch]
  );

  // 구글 로그인 버튼 클릭시 구글 로그인
  function GoogleLoginClick() {
    saveLoginInfo().then(async () => {
      startLoading();
      document.body.style.overflow = "hidden";
      return await googleLoginPopup()
        .then(async ({ user }) => {
          await getFirebaseData("user", user.uid).then(async (r) => {
            if (r.data() === undefined) {
              await setFirebaseData("user", user.uid, {
                itemList: [],
              });
              loginUser(user);
            } else {
              loginUser(user);
            }
          });
          alert(`환영합니다 ${user.displayName}님, 구글 로그인 되었습니다.`);
          navi("/");
          document.body.style = "";
          endLoading();
        })
        .catch((e) => {
          document.body.style = "";
          endLoading();
          alert("구글로그인에 실패 했습니다.");
          console.log(e);
        });
    });
  }

  // 이메일, 비밀번호 미입력시 출력
  const [emailAlert, setEmailAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [emailAndPasswordAlert, setEmailAndPasswordAlert] = useState(false);

  // 이메일 로그인
  function emailLoginClick() {
    if (email === "") {
      setEmailAlert(true);
      setPasswordAlert(false);
      setEmailAndPasswordAlert(false);
    } else if (password === "") {
      setPasswordAlert(true);
      setEmailAlert(false);
      setEmailAndPasswordAlert(false);
    } else if (password !== "") {
      saveLoginInfo().then(async () => {
        startLoading();
        document.body.style.overflow = "hidden";
        await emailLogin(email, password)
          .then(async (result) => {
            loginUser(result.user);
            const hiEmailUser = result.user.email;
            alert(`어서오세요, ${hiEmailUser}님, 이메일 로그인 되었습니다.`);
            document.body.style = "";
            endLoading();
            navi("/");
          })
          .catch((e) => {
            console.log(e);
            document.body.style = "";
            endLoading();
            setEmailAlert(false);
            setPasswordAlert(false);
            setEmailAndPasswordAlert(true);
          });
      });
    }
  }

  // 데모계정 로그인
  function demoLoginClick() {
    saveLoginInfo().then(async () => {
      startLoading();
      document.body.style.overflow = "hidden";
      await emailLogin('test@test.test', 'testtest')
        .then(async (result) => {
          loginUser(result.user);
          const hiEmailUser = result.user.email;
          alert(`어서오세요, ${hiEmailUser}님, 이메일 로그인 되었습니다.`);
          document.body.style = "";
          endLoading();
          navi("/");
        })
        .catch((e) => {
          console.log(e);
          document.body.style = "";
          endLoading();
        });
    });
  }

  /*아이디찾기 모달창 기능*/
  const [searchID, setSearchID] = useState(false);

  const openWindow = () => {
    setSearchID(true);
  };

  const closeWindow = () => {
    setSearchID(false);
  };

  /*아이디찾기 모달창 기능*/
  const [searchPassword, setSearchPassword] = useState(false);

  const openWindowPS = () => {
    setSearchPassword(true);
  };

  const closeWindowPS = () => {
    setSearchPassword(false);
  };

  return (
    <main className="LoginLogin_Main">
      <div>
        <div className="Loginmain_container">
          <div className="Loginmain_wrap">
            <section className="Loginlogin_input_section_wrap">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  emailLoginClick();
                }}
              >
                <div className="Loginlogin_input_wrap">
                  <span className="icon">
                    <FontAwesomeIcon icon={regular("user")} />
                  </span>
                  <input
                    placeholder="이메일을 입력해주세요"
                    type="email"
                    onChange={inputEmail}
                  />
                </div>
                <div className="Loginlogin_input_wrap password_wrap">
                  <span className="icon">
                    <FontAwesomeIcon icon={solid("unlock-keyhole")} />
                  </span>
                  <input
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    onChange={inputPassword}
                  />
                </div>
                <section className="Loginforget_account_p caption">
                  <button
                    className="Loginforget_account_a"
                    onClick={openWindow}
                    type="button"
                  >
                    아이디 찾기
                  </button>
                  <button
                    className="Loginforget_account_a"
                    onClick={openWindowPS}
                    type="button"
                  >
                    비밀번호 찾기
                  </button>
                  <Link to="/enteruser/agree" className="Loginforget_account_a">
                    회원가입
                  </Link>
                </section>
                <SearchID open={searchID} close={closeWindow} />
                <SearchPassword open={searchPassword} close={closeWindowPS} />
                <div className="Loginlogin_button_wrap">
                  <ButtonComp color="mint" onClick={emailLoginClick} type="button">
                    로그인
                  </ButtonComp>
                  <ButtonComp color="demo" onClick={demoLoginClick} type="button">
                    데모 계정 로그인
                  </ButtonComp>
                </div>
              </form>

              <div className="Alert">
                {emailAlert && (
                  <div>
                    <p>
                      <strong>이메일</strong>을 입력해주세요
                    </p>
                  </div>
                )}
                {passwordAlert && (
                  <div>
                    <p>
                      <strong>비밀번호</strong>를 입력해주세요
                    </p>
                  </div>
                )}
                {emailAndPasswordAlert && (
                  <div>
                    <p>
                      <strong>이메일</strong> 또는 <strong>비밀번호</strong>를
                      잘못 입력하셨습니다.
                      <br />
                      입력하신 내용을 다시 확인해주세요.
                    </p>
                  </div>
                )}
              </div>
            </section>
            <div className="Logincontainer">
              <div className="or_box">
                <hr />
                <span>OR</span>
                <hr />
              </div>
              <BrandButton src={Googlelogo} color="white">
                <p onClick={GoogleLoginClick}>Google 로 로그인</p>
              </BrandButton>
              <BrandButton src={Facebooklogo} color="facebook">
                <p>Facebook 으로 로그인</p>
              </BrandButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginMainPage;
