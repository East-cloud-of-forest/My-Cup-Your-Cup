import React from "react";
import { useState } from "react";
import { resetPS } from "../../../datasources/firebase";
import { ButtonComp } from "../../index-comp/IndexComp";

import "./Search.scss";

const SearchPassword = (props) => {
  const { open, close } = props;
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(false);
  const [block, setBlock] = useState(true);

  function closeAndReset() {
    close();
    setError(false);
    setEmail("");
    setOk(false);
    setBlock(true)
  }

  function inputEmail(e) {
    let v = e.target.value;
    let re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    setBlock(!(re.test(v)));
    setEmail(v);
  }

  function reset() {
    setError(false);
    if (email !== "") {
      resetPS(email)
        .then(() => {
          setOk(true);
          setBlock(true)
        })
        .catch(() => {
          setError(true);
        });
    }
  }

  return (
    <div
      className={open ? "openModal serchModal" : "serchModal"}
      onClick={closeAndReset}
    >
      {open ? (
        <section onClick={(e) => e.stopPropagation()}>
          <header>
            비밀번호 재설정
            <button className="close" onClick={closeAndReset} type="button">
              X
            </button>
          </header>

          <main>
            <p>이메일</p>
            {ok ? (
              <>
                <p className="ok">
                  해당하는 메일로 비밀번호 재설정 메일을 전송했습니다. 비밀번호
                  변경 후 로그인 해주세요.
                </p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="가입한 이메일을 입력해주세요."
                  onChange={(e) => inputEmail(e)}
                  value={email}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      reset();
                    }
                  }}
                />
                <span>
                  가입한 이메일을 입력하고 버튼을 누르면 임시비밀번호가 입력하신
                  이메일로 발급됩니다.
                </span>
              </>
            )}
            <div>
              <div>
                <span className={error ? "active" : null}>
                  회원정보를 찾을 수 없습니다.
                </span>
              </div>
              <ButtonComp
                type="button"
                color="red"
                onClick={reset}
                disable={block}
              >
                임시비밀번호 발급
              </ButtonComp>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
};

export default SearchPassword;
