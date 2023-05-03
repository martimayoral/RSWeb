import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Outlet, BrowserRouter, Navigate } from "react-router-dom";
import { ReportsPage } from './pages/ReportsPage';
import { Header } from './components/Header';
import { MainPage } from './pages/MainPage';
import { Logs } from './pages/Logs';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { Auth } from './pages/Auth';
import { CreateNewUser } from './pages/CreateNewUser';
import { SignOut } from './pages/SignOut';
import { Box, Typography, CircularProgress } from "@mui/material"
import { authActions } from './redux/auth/slice';
import { LicencePermision } from './assets/global';

function RouteWithPermisions({ element, permision }: { element: JSX.Element, permision: keyof LicencePermision }) {
  const currentLicence = useAppSelector(s => s.auth.licencePermisions)
  if (!(currentLicence && currentLicence[permision])) {
    console.log("refasd")
    return <Navigate to="/" />
  }

  return element
}

function App(): JSX.Element {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authActions.authFromToken())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/reports' element={
            <RouteWithPermisions permision='solveReports' element={<ReportsPage />} />
          } />

          <Route path='/logs' element={
            <RouteWithPermisions permision='logOverview' element={<Logs />} />
          } />

          <Route path='/createNewUser' element={
            <RouteWithPermisions permision='solveReports' element={<CreateNewUser />} />
          } />

          {/* <Route path="/" element={<Editor />} /> */}

          {/* <Route path="authError" element={<AuthErrorPage />} /> */}

          {/* <Route index path="*" element={<UnknownPage />} /> */}
        </Route>
        <Route path='/signOut' element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

function Layout() {
  const authStatus = useAppSelector(state => state.auth.authStatus)

  if (authStatus === "loading")
    return (
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant='h5' color="gray">
          Loading auth
        </Typography>
        <br />
        <CircularProgress sx={{ color: "lightgray" }} />
      </Box>
    )

  if (authStatus === "auth_success")
    return (
      <div className="App">
        <Header />
        <Outlet />
      </div>
    )

  return (
    <Auth />
  )
}