import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import HomeComp from "./pages/Home/Home";
import Header from "./components/HeaderComp";
import Footer from "./components/FooterComp";
import MyDesign from "./pages/MyDesign/MyDesign";
import LoginMain from "./pages/EnterUser/Login/LoginMain";
import JoinUser from "./pages/EnterUser/Join/JoinUser";
import QnAmenu from "./pages/QnA/QnAmenu";
import Review from "./pages/Review/Review";
import CreatePage from "./pages/Create/CreatePage";
import PayPage from "./pages/Pay/PayPage";
import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";
import ReviewWriteForm from "./pages/Review/ReviewWriteForm";
import CreateDesignUploadForm from "./pages/Create/CreateDesignUploadForm";
import SearchResultComp from "./components/SearchComp/SearchResultComp";
import FaqPage from "./pages/QnA/FaqPage";
import MyQuastion from "./pages/QnA/MyQuastion";
import Ask from "./pages/QnA/Ask";
import Design from "./pages/Design/Design";
import EnterUser from "./pages/EnterUser/EnterUser";
import Agreement from "./pages/EnterUser/Agreement/Agreement";

function App() {
  const location = useLocation();
  const hideHeader = (location) => {
    switch (location) {
      case "/enteruser/login":
      case "/enteruser/agree":
      case "/enteruser/join":
      case "/review/write" :
        return false;
      default:
        return true;
    }
  };
  
  return (
    <div className="App">
      {hideHeader(location.pathname) ? <Header /> : null}
      <main>
        <Routes>
          <Route index element={<HomeComp />} />
          <Route path="/design" element={<Design />} />
          <Route path="/mydesign" element={<MyDesign />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/write" element={<ReviewWriteForm />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/create/write" element={<CreateDesignUploadForm />} />
          <Route path="/enteruser" element={<EnterUser />} >
            <Route path="/enteruser/login" element={<LoginMain />} />
            <Route path="/enteruser/join" element={<JoinUser />} />
            <Route path="/enteruser/agree" element={<Agreement />} />
          </Route>
          <Route path="/QnAmenu" element={<QnAmenu />} />
          <Route path="/QnAmenu/FaqPage" element={<FaqPage />} />
          <Route path="/QnAmenu/MyQuastion" element={<MyQuastion />} />
          <Route path="/QnAmenu/Ask" element={<Ask />} />

          <Route path="/pay" element={<PayPage />} />
          <Route path="/search" element={<Search />}>
            <Route path=":tabkind" element={<SearchResultComp />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      {hideHeader(location.pathname) ? <Footer /> : null}
    </div>
  );
}

export default App;
