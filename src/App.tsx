import Dashboard from "./pages/Dashboard/Dashboard"
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
import { useCoinCapWebSocket } from "./api/services/socket/useCoinCapWebSocket";

function App() {

  useCoinCapWebSocket()


  return (
    <>

      <ConfigProvider theme={{
        components: {
          Table: {
            colorBgContainer: '#181A20',
            colorBorderSecondary: '#181A20',
            colorText: '#EAECEF',
            colorTextHeading: '#848E9C',
            headerBg: '#181A20',
            rowHoverBg: '#1E2026',
          },
          Skeleton: {
            color: "#303030",
            colorGradientEnd: "#424242"
          },
          Button: {
            colorPrimary: '#FCD535',
            primaryColor: "#202630",
            colorPrimaryHover: "#FCD535",
            colorPrimaryActive: "#F0B90B",
            fontSize: 16,
            fontWeight: 500
          },
        },
      }}>
        <Router>
          <Header />
          <div className="content">
            <Routes>
              <Route index element={<Dashboard />} />
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
