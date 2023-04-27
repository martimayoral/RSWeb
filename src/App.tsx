import './App.css';
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import { ReportsPage } from './pages/ReportsPage';
import { Header } from './components/Header';
import { MainPage } from './pages/MainPage';

function App(): JSX.Element {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/reports' element={<ReportsPage />} />

          {/* <Route path="/" element={<Editor />} /> */}

          {/* <Route path="authError" element={<AuthErrorPage />} /> */}

          {/* <Route index path="*" element={<UnknownPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

function Layout() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  )
}