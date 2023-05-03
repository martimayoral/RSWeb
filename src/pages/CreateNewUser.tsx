import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SelectModRange from '../components/SelectModRange';
import axios from 'axios';
import { useAppSelector } from '../redux/hooks';
import { lincencePermisions } from '../assets/global';

type CreateModStatus = "OK" | "ERROR" | "CREATING" | null

export function CreateNewUser() {
    const auth = useAppSelector((s) => s.auth.token)
    const licenceRange = useAppSelector((s) => s.auth.licencePermisions?.range)
    const [selectedModRange, setSelectedModRange] = useState(0)
    const [createModStatus, setCreateModStatus] = useState<CreateModStatus>()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            firstName: data.get('firstName'),
            password: data.get('password'),
        });

        setCreateModStatus("CREATING")
        axios.post("/createMod", {
            "username": data.get('firstName'),
            "password": data.get('password'),
            "modRange": lincencePermisions[selectedModRange].range,
            "salt": "saltsaltsaltsalt"
        })
            .then((v) => (v && v.data >= 0) ? setCreateModStatus("OK") : setCreateModStatus("ERROR"))
            .catch(() => { setCreateModStatus("ERROR") })
    };

    // nom
    // rango
    // password

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <SupervisedUserCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create new user
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>


                    <TextField
                        margin='normal'
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        error={createModStatus === "ERROR"}
                        aria-errormessage='afasodf'
                    />
                    <TextField
                        margin='normal'
                        name="password"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                    />
                    <Typography
                        p={1}
                        color={"text.secondary"}
                    >
                        Range
                    </Typography>
                    <SelectModRange maxRange={licenceRange || 0} selected={selectedModRange} setSelected={setSelectedModRange} />
                    {/* 
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid> */}
                    {
                        (createModStatus === "OK") ?
                            (
                                <Box sx={{ display: 'flex', my: 3 }}>
                                    <Typography
                                        p={1}
                                        color={"success.main"}
                                    >
                                        Created succesfully!
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        sx={{ ml: "auto" }}
                                        onClick={() => setCreateModStatus(null)}
                                    >
                                        Create another!
                                    </Button>
                                </Box>
                            ) :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ my: 3 }}
                                disabled={createModStatus === "CREATING"}
                            >
                                Create!
                            </Button>
                    }

                </Box>
            </Box>
        </Container >
    );
}