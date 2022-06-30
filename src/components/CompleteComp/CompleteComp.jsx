import React from 'react';
import { useNavigate } from 'react-router-dom'
import {ButtonComp} from '../../components/index-comp/IndexComp'

const CompleteComp = () => {

  const navigate = useNavigate()

  const navHome = () =>{
    navigate('/')
  }

  return (
    <div>
      <div className='complete_div'>
        <img src={require("./img/img.jpg")} alt="" width={"500px"} />
        <ButtonComp style={{margin:"0 0 30px 0"}} onClick={navHome} >홈으로 돌아가기</ButtonComp>
      </div>
    </div>
  );
};

export default CompleteComp;