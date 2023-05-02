import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { authActions } from '../redux/auth/slice';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export function Auth() {
    const dispatch = useAppDispatch()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username')?.toString() || ""
        const password = data.get('password')?.toString() || ""

        dispatch(authActions.logInRequest({ username, password }))
    };

    const authStatus = useAppSelector(s => s.auth.authStatus)
    const [seePwd, setSeePwd] = useState(false)

    const error = authStatus === "auth_error"

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        error={error}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={seePwd ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton color="inherit" aria-label="pwd visible"
                                        onClick={() => setSeePwd(b => !b)}>
                                        {seePwd ?
                                            <VisibilityIcon />
                                            :
                                            <VisibilityOffIcon />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        error={error}
                    />
                    <Typography color='error'>
                        {
                            error ?
                                "Incorrect password or username"
                                :
                                <br />
                        }
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={authStatus === "auth_pending"}
                    >
                        Sign In
                    </Button>
                </Box>
                {/* {authStatus} */}
            </Box>
        </Container>
    );
}