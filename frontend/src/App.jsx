import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import {Frontpage} from "./pages/Frontpage.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import {Expenses} from "./components/expenses.jsx";
import {RecoilRoot} from "recoil";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element ={<Frontpage />} />
              <Route path={"/dashboard"} element={<Dashboard/>}/>
              <Route path={"/expense"} element={<RecoilRoot><Expenses/></RecoilRoot>}/>
          </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
