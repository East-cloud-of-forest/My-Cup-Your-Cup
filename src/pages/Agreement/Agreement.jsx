import { useEffect } from 'react'
import { useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Agreement = () => {
  const [accordion, setAccordion] = useState([
    {
      key: '0',
      active: false,
    },
    {
      key: '1',
      active: false,
    },
    {
      key: '2',
      active: false,
    },
    {
      key: '3',
      active: false,
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
  useEffect(() => {
    accordion.filter((a) => a.active == true).length == accordion.length
      ? setAllActive(true)
      : setAllActive(false)
  }, [accordion])

  return (
    <div>
      <input type="checkbox" checked={allActive} onChange={allCange} />
      <span>전체동의</span>
      <Accordion alwaysOpen activeKey={activeKey}>
        {accordion.map((a, i) => (
          <Accordion.Item eventKey={a.key} key={i}>
            <Accordion.Header onClick={() => onClick(a.key)}>
              <input type="checkbox" checked={a.active} readOnly />
              Accordion Item #1
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Link to="/join?agree=Y">회원가입으로</Link>
    </div>
  )
}

export default Agreement
