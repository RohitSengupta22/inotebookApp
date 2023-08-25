import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';

import { createContext } from 'react';

import './App.css'

// export const authContext = createContext();



const Login = () => {

    const [Login, setLogin] = React.useState(true)
    const [logincred, setLogincred] = React.useState({ email: "", password: "" })
    const [signupcred, setSignupcred] = React.useState({ name: "", email: "", password: "" })
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [authToken, setAuthToken] = React.useState('');
    const [circular, setCircular] = React.useState(false)
    





    function signupTrue() {
        setLogin(false)
    }

    function loginTrue() {
        setLogin(true)
    }

    function logincredHandler(e) {
        e.preventDefault()
        setLogincred({ ...logincred, [e.target.name]: e.target.value })
    }

    function signupcredHandler(e) {
        e.preventDefault()
        setSignupcred({ ...signupcred, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();

    async function handleLogin() {
        try {

            const response = await fetch('http://localhost:3006/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logincred),
            })



            if (response.ok) {
                const res = await response.json();
                setAuthToken(res.authToken)
                console.log(res.authToken)

                setCircular(true)
               

                localStorage.setItem('Token', res.authToken)

                setTimeout(() => {
                navigate('/home');
            }, 3000);
            } else {
                toast("invalid Credentials")
            }

        } catch (error) {

            console.log(`An error occured ${error}`)
        }
    }



    async function handleSignup() {
        try {

            const response = await fetch('http://localhost:3006/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupcred),
            })



            if (response.ok) {
                const res = await response.json();
                setAuthToken(res.authToken)
                localStorage.setItem('Token', res.authToken)


                navigate('/home');
            } else {
                toast("User Already exists")
            }

        } catch (error) {

            console.log(`An error occured ${error}`)
        }
    }

    return (


        <div>

            {circular && <Box sx={{ display: 'flex' }}>
                <CircularProgress className='circular' />
            </Box>}

            

            <Toaster toastOptions={{
                className: '',
                style: {
                    border: '1px solid red',
                    padding: '16px',
                    color: 'white',
                    backgroundColor: "red"
                },
            }} />
            {Login ? (<div className="Login">

                <h4 style={{ textAlign: "center" }}>Login</h4>

                <form className='LoginForm'>


                    <TextField id="outlined-basic" className='Credbox'
                        name="email" label="Email"
                        variant="outlined" type='email'
                        value={logincred.email}
                        onChange={logincredHandler} />
                    <TextField id="outlined-basic" className='Credbox'
                        name='password' label="Password"
                        variant="outlined" type="password"
                        value={logincred.password}
                        onChange={logincredHandler} />


                    <Button variant="contained" className='Loginbtn' onClick={handleLogin}>Login</Button>
                    <hr style={{ width: '40%', borderTop: '1px solid black', margin: '10px 0', float: "left" }} />
                    <Button variant="contained" className='signupbtn' onClick={signupTrue}>Create Account</Button>



                </form>

            </div>)

                :

                (<div className="Signup">

                    <h4 style={{ textAlign: "center" }}>Sign Up</h4>

                    <form className='signupForm'>

                        <TextField id="outlined-basic" className='Credbox' name='name' label="Name" variant="outlined"
                            value={signupcred.name}
                            onChange={signupcredHandler} />
                        <TextField id="outlined-basic" className='Credbox' name='email' label="Email" variant="outlined" type='email'
                            value={signupcred.email}
                            onChange={signupcredHandler} />
                        <TextField id="outlined-basic" className='Credbox' name='password' label="Password" variant="outlined" type="password"
                            value={signupcred.password}
                            onChange={signupcredHandler} />


                        <Button variant="contained" className='signupbtn' onClick={handleSignup}>Signup</Button>
                        <hr style={{ width: '40%', borderTop: '1px solid black', margin: '10px 0', float: "left" }} />
                        <Button variant="contained" className='Loginbtn' onClick={loginTrue}>Already Have An Account?</Button>



                    </form>

                </div>)}

        </div>



    )

}



export default Login;