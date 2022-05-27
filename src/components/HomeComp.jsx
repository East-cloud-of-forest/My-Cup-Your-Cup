import './HomeComp.scss'
import { Button } from './index-comp/IndexComp'

const HomeComp = () => {

  return (
    <div className='maincomp'>
      <div className='main_banner'>
        메인 배너
        <Button>텀블러 제작하러 가기</Button>
      </div>
      <div className='main_slide'>
        메인 슬라이더
      </div>
      <p className='text-center subtitle'>인기 태그</p>
      <ul className='main_circlemenu'>
        <li className='main_circleitem'></li>
        <li className='main_circleitem'></li>
        <li className='main_circleitem'></li>
        <li className='main_circleitem'></li>
      </ul>
      <p className='text-center subtitle'>리뷰</p>
      <ul className='main_review'>
        <li className='main_review_item'></li>
        <li className='main_review_item'></li>
        <li className='main_review_item'></li>
        <li className='main_review_item'></li>
        <li className='main_review_item'></li>
        <li className='main_review_item'></li>
        <li className='main_review_item'></li>
        <li className='main_review_item'></li>
      </ul>
      <p className='text-center subtitle'>디자인</p>
      <ul className='main_design'>
        <li className='main_design_item'></li>
        <li className='main_design_item'></li>
        <li className='main_design_item'></li>
        <li className='main_design_item'></li>
      </ul>
    </div>
  )
}

export default HomeComp