import classNames from 'classnames'
import { useEffect } from 'react'
import { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import agreeform from '../../components/AgreementComp/personal'
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
  const activeKey = accordion.map((a) => !a.active && a.key)
  const [allActive, setAllActive] = useState(false)
  const onClick = (activekey) => {
    setAccordion(
      accordion.map((accordion) => {
        if (accordion.key == activekey) {
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

  useEffect(() => {
    accordion.filter((a) => a.active == true).length == accordion.length
      ? setAllActive(true)
      : setAllActive(false)
  }, [accordion])

  return (
    <div className="agreement_page">
      <div className='allagree_block' onClick={allClick}>
        <input
          type="checkbox"
          checked={allActive}
          onChange={allCange}
          id="agreecheckall"
        />
        <label htmlFor="agreecheckall" className='agreecheckall'></label>
        <span>내잔네잔 서비스 이용약관 및 개인정보 처리방침, 전자상거래 표준약관, 개인정보 제 3자 제공에 관한 사항(선택)에 모두 동의합니다.</span>
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
                <label
                  htmlFor={'agreecheck' + i}
                  onClick={() => onClick(a.key)}
                ></label>
              </div>
            </Accordion.Header>
            <Accordion.Body
              className="accodion_body"
              dangerouslySetInnerHTML={{ __html: a.content }}
            />
          </Accordion.Item>
        ))}
      </Accordion>
      <Link to="/join?agree=Y">회원가입으로</Link>
    </div>
  )
}

export default Agreement
