import './App.scss'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeComp from './pages/Home/Home'
import Header from './components/HeaderComp'
import Footer from './components/FooterComp'
import MyDesign from './pages/MyDesign/MyDesign'
import LoginMain from './pages/EnterUser/Login/LoginMain'
import JoinUser from './pages/EnterUser/Join/JoinUser'
import QnAmenu from './pages/QnA/QnAmenu'
import Review from './pages/Review/Review'
import CreatePage from './pages/Create/CreatePage'
import Complete from './pages/Complete/Complete'
import PayPage from './pages/Pay/PayPage'
import Search from './pages/Search/Search'
import Cart from './pages/Cart/Cart'
import ReviewWriteForm from './pages/ReviewWirete/ReviewWriteForm'
import CreateDesignUploadForm from './pages/Create/CreateDesignUploadForm'
import SearchResultComp from './components/SearchComp/SearchResultComp'
import FaqPage from './pages/QnA/FaqPage'
import MyQuastion from './pages/QnA/MyQuastion'
import Ask from './pages/QnA/Ask'
import Design from './pages/Design/Design'
import EnterUser from './pages/EnterUser/EnterUser'
import Agreement from './pages/EnterUser/Agreement/Agreement'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserModule } from './modules/enteruser'
import { loginSession } from './datasources/firebase'
import PostEditForm from './pages/Create/PostEditForm'
import EditUser from './pages/EnterUser/Edit/EditUser'
import PayList from './pages/PayList/PayList'
import ReviewEditForm from './pages/ReviewWirete/ReviewEditForm'
import { produceWithPatches } from 'immer'



function App() {
  const location = useLocation()
  const hideHeader = (location) => {
    switch (location) {
      case '/enteruser/login':
      case '/enteruser/agree':
      case '/enteruser/join':
      case '/review/write':
      case '/create/upload':
      case '/editprofile':
        return false
      default:
        return true
    }
  }


  // 로그인 유지
  const dispatch = useDispatch()
  const loginUser = useCallback((user) => dispatch(loginUserModule(user)), [
    dispatch,
  ])
  useEffect(() => {
    const loginToken = loginSession()
    if (loginToken) {
      loginUser(loginToken)
    } else {
      loginUser(null)
    }
  }, [])



  return (
    <div className="App">
      {hideHeader(location.pathname) ? <Header /> : null}
      <main>
        <Routes>
          <Route index element={<HomeComp />} />
          <Route path="/design" element={<Design />} />
          <Route path="/mydesign" element={<MyDesign />} />
          <Route path="/mydesign/edit/:id" element={<PostEditForm />} />
          
          <Route path="/review" element={<Review />} />
          <Route path="/review/write" element={<ReviewWriteForm />} />
          <Route path="/review/write/:id" element={<ReviewWriteForm />} />
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/create/upload" element={<CreateDesignUploadForm />} />
          <Route path="/enteruser" element={<EnterUser />}>
            <Route path="/enteruser/login" element={<LoginMain />} />
            <Route path="/enteruser/join" element={<JoinUser />} />
            <Route path="/enteruser/agree" element={<Agreement />} />
          </Route>
          <Route path="/editprofile" element={<EditUser/>} />
          <Route path="/QnAmenu" element={<QnAmenu />} />
          <Route path="/QnAmenu/FaqPage" element={<FaqPage />} />

          <Route path="/QnAmenu/MyQuastion" element={<MyQuastion/> }/>
          <Route path="/QnAmenu/Ask" element={<Ask />} />

          <Route path="/pay" element={<PayPage />} />
          <Route path="/search" element={<Search />}>
            <Route path=":tabkind" element={<SearchResultComp />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/complete" element={<Complete/> } />
          <Route path="/paylist" element={<PayList/> } />
        </Routes>
      </main>
      {hideHeader(location.pathname) ? <Footer /> : null}
    </div>
  )
}

export default App
