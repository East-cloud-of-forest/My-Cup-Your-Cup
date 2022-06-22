
import { React, useState, useCallback } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Loginmain.scss'
import BrandButton from '../../../components/Login/BrandButton'
import SearchID from '../../../components/Login/SearchID/SearchID'
import SearthPassword from '../../../components/index-comp/IndexComp'
import { ButtonComp } from '../../../components/index-comp/IndexComp'
import { solid, reqular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Googlelogo from '../../../components/Login/img/googleicon.svg'
import Facebooklogo from '../../../components/Login/img/facebookicon.svg'
import { loginUserModule } from '../../../modules/enteruser'
import { emailLogin, googleLoginPopup } from '../../../datasources/firebase'

const LoginMainPage = () => {
    const [ email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navi = useNavigate()

    const inputEmail = (e) => {
        setEmail(e.target.value)
    }
    const imputPassword = (e) => {
        setPassword(e.target.value)
    }

    const loginUser = UseCallback((user) => dispatch(loginUserModule(user)),
    [dispatch,])
    
    function GoogleLoginClick() {
        googleLoginPopup()
        .then((result) => {
            loginUser(result.user)
            navi('/')
        })
        .catch((e) => {
            alert('구글로그인에 실패했습니다.')
            console.log(e)
        })
    }

    const [searchID, setSearchID] = useState(false)

    const openWindow = () => {
        setSearchID(true)
    }
    const closeWindow = () => {
        setSearthID(false)
    }

    const [searchPassword, setSearchPassword] = useState(false)
    const openWindowPS = () => {
        setSearchPassword(true)
    }
    const closeWindowPS = () => {
        setSearchPassword(false)
    }

    return (
        <main>
            <div>
                <div>
                    <div>
                        s


                    </div>
                </div>
            </div>
        </main>
    )
}
