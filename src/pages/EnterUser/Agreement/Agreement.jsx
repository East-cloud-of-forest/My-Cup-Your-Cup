import classNames from 'classnames'
import { useEffect } from 'react'
import { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import agreeform from '../../../components/AgreementComp/personal'
import { ButtonComp } from '../../../components/index-comp/IndexComp'
import './Agreement.scss'

const Agreement = () => {
  const [accordion, setAccordion] = useState([
    {
      ...agreeform[0],
      key: '0',
      active: false,
      required: true,
    },
    {
      ...agreeform[1],
      key: '1',
      active: false,
      required: true,
    },
    {
      ...agreeform[2],
      key: '2',
      active: false,
      required: false,
    },
  ])
  const [allActive, setAllActive] = useState(false)
  const [noagree, setNoagree] = useState(false)
  const activeKey = accordion.map((a) => !a.active && a.key)
  useEffect(() => {
    accordion.filter((a) => a.active === true).length === accordion.length
      ? setAllActive(true)
      : setAllActive(false)
  }, [accordion])
  const navi = useNavigate()

  const onClick = (activekey) => {
    setAccordion(
      accordion.map((accordion) => {
        if (accordion.key === activekey) {
          accordion.active = !accordion.active
        }
        return accordion
      }),
    )
  }

  const allCange = (e) => {
    setAccordion(
      accordion.map((accordion) => {
        accordion.active = e.target.checked
        return accordion
      }),
    )
  }

  const allClick = (e) => {
    setAccordion(
      accordion.map((accordion) => {
        accordion.active = !e.currentTarget.children[0].checked
        return accordion
      }),
    )
  }

  const gotoJoin = () => {
    if (
      accordion.filter((a) => a.required).filter((a) => a.active).length === 2
    ) {
      navi(
        '/enteruser/join?' +
          accordion.map((a) => a.name + '=' + (a.active ? 'Y' : 'N')).join('&'),
      )
    } else {
      setNoagree(true)
    }
  }

  return (
    <div className="agreement_page">
      <div className="allagree_block" onClick={allClick}>
        <input
          type="checkbox"
          checked={allActive}
          onChange={allCange}
          id="agreecheckall"
        />
        <div>
          <label htmlFor="agreecheckall" className="agreecheckall"></label>
        </div>
        <span>
          내잔네잔 서비스 이용약관 및 개인정보 처리방침, 전자상거래 표준약관,
          개인정보 제 3자 제공에 관한 사항(선택)에 모두 동의합니다.
        </span>
      </div>
      <Accordion alwaysOpen activeKey={activeKey}>
        {accordion.map((a, i) => (
          <Accordion.Item eventKey={a.key} key={i}>
            <Accordion.Header
              onClick={() => onClick(a.key)}
              className={classNames(a.required ? null : 'noneRequired')}
            >
              <p>{a.title}</p>
              <div>
                <span className="caption">
                  ({a.required ? '필수' : '선택'})
                </span>
                <input
                  type="checkbox"
                  checked={a.active}
                  readOnly
                  id={'agreecheck' + i}
                />
                <div>
                  <label
                    htmlFor={'agreecheck' + i}
                    onClick={() => onClick(a.key)}
                  ></label>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body
              className="accodion_body"
              dangerouslySetInnerHTML={{ __html: a.content }}
            />
          </Accordion.Item>
        ))}
      </Accordion>

      {noagree ? (
        <div className="noagree">
          <p>
            필수 동의 사항 (내잔네잔 서비스 이용약관, 전자상거래 표준약관) 에
            동의해주세요.
          </p>
        </div>
      ) : null}

      <div className="btn_block">
        <Link to="/">
          <ButtonComp color="red">취소</ButtonComp>
        </Link>
        <ButtonComp color="mint" onClick={gotoJoin}>
          확인
        </ButtonComp>
      </div>
    </div>
  )
}

export default Agreement
