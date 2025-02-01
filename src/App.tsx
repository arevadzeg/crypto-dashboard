import Overview from "./pages/overview/Overview"
import CoinPage from "./pages/ConvertPage/ConvertPage"

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router";
import Header from "./components/layout/Header/Header";
import './index.scss'

function App() {

  return (
    <>
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="convert/:convertFromId/:convertToId" element={<CoinPage />} />
          </Routes>
        </div>
        <footer />
      </Router>
    </>
  )
}

export default App
