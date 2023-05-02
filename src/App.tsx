import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
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
          <Route path='/reports' element={<ReportsPage />} />
          <Route path='/logs' element={<Logs />} />

          <Route path='/createNewUser' element={<CreateNewUser />} />

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
          <CircularProgress sx={{color:"lightgray"}} />
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