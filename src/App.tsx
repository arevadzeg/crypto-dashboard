import Overview from "./pages/overview/Overview"
import CoinPage from "./pages/ConvertPage/ConvertPage"

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router";
import Header from "./components/layout/Header/Header";
import './index.scss'
import PagePrice from "./pages/PricePage/PricePage";
import { ConfigProvider } from "antd";

function App() {

  return (
    <>

      <ConfigProvider theme={{
        components: {
          Skeleton: {
            color: "#303030",
            colorGradientEnd: "#424242"
          }
        }
      }}>
        <Router>
          <Header />
          <div className="content">
            <Routes>
              <Route index element={<Overview />} />
              <Route path="convert/:convertFromId/:convertToId" element={<CoinPage />} />
              <Route path="price/:coinId" element={<PagePrice />} />
            </Routes>
          </div>
          <footer />
        </Router>
      </ConfigProvider>

    </>
  )
}

export default App
