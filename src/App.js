import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./pages/Home/Home";
import Header from "./components/HeaderComp";
import Footer from "./components/FooterComp";
import Mypage from "./pages/MyPage/Mypage";
import LoginMain from "./pages/Login/LoginMain";
import JoinUser from "./pages/Join/JoinUser";
import ReviewComp from "./pages/Review/Review";
import CreatePage from "./pages/Create/CreatePage";
import PayPage from "./pages/Pay/PayPage";
import Search from "./pages/Search/Search";
import Cart from "./pages/Cart/Cart";
import ReviewWriteForm from "./pages/Review/ReviewWriteForm";
import CreateDesignUploadForm from "./pages/Create/CreateDesignUploadForm";
import SearchResultComp from "./components/SearchComp/SearchResultComp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route index element={<HomeComp />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/review" element={<ReviewComp />} />
            <Route path="/review/write" element={<ReviewWriteForm />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/create/write" element={<CreateDesignUploadForm />} />
            <Route path="/Login" element={<LoginMain />} />
            <Route path="/Join" element={<JoinUser />} />
            <Route path="/pay" element={<PayPage/>} />
            <Route path="/search" element={<Search />}>
              <Route path=":tabkind" element={<SearchResultComp />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
