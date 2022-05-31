import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComp from "./components/HomeComp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MypageComp from "./components/Mypage/MypageComp";
import CreateComp from "./components/createcomp/CreateComp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeComp />} />
            <Route path="/mypage" element={<MypageComp />} />
            <Route path="/create" element={<CreateComp />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
