import React, { useState } from 'react';
import './LoginForm.css'; // make sure to create a corresponding CSS file
import { useSpring, animated } from 'react-spring';

import {AccountCircle, Lock, VisibilityOff, Visibility} from '@mui/icons-material';
import {Card, CardContent, Typography, TextField, Menu, MenuItem, Button, InputAdornment, IconButton} from '@mui/material/';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../hooks.js'
import { useApiWithoutToken } from '../../hooks.js';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const api = useApiWithoutToken();


  const [values, setValues] = useState({
    password: '',
    confirmPassowrd: '',
    showPassword: false,
  });

  const handleMouseDownPassword = () => {
    setValues({ ...values, showPassword: true });
  };

  const handleMouseUpPassword = () => {
    setValues({ ...values, showPassword: false });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const handleCreateAccount = async (event) => {
    if(showCreateAccount)
    {
      // const response = await fetch('https://localhost:44392/api/account', {
      //   method: 'POST', // Method type
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     "emailAddress": username,
      //     "password": values.password
      //   })
      // });

      api.postForm('/account', {
        "emailAddress": username,
        "password": values.password
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            login(data.result.jsonWebToken);
            navigate('/landing', { replace: true });
          });
        }
        else if (response.status === 400) {
          response.json().then(x => {
            console.log(x);
          })
        }
        else {
          console.log("Failed to save account");
        }
      })

      // console.log("response", response)
  
      // if (!response.ok) {
      //   throw new Error('Failed to save account');
      // }
    
      // response.json().then(x => {
      //   login(x.result.jsonWebToken)
      //   navigate('/landing', { replace: true });
      // })
    }

    setShowLogin(false); 
    setShowCreateAccount(true); 

}
  
  const handleLogin = async (event) => {

    if(showLogin)
    {
      const response = await fetch('https://localhost:44392/api/authenticate', {
        method: 'POST', // Method type
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "emailAddress": username,
          "password": values.password
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to Login');
      }
      
      response.json().then(x => {
        login(x.result.jsonWebToken)
        navigate('/landing', { replace: true });
      })
    }

    console.log("log in"); 
    setShowLogin(true); 
    setShowCreateAccount(false); 
};

  const formSpring = useSpring({
    opacity: showCreateAccount || showLogin  ? 1 : 0,
    transform: (showCreateAccount || showLogin) ? 'translateY(0)' : 'translateY(-50px)',
  });


  return (
    <div>
        <div className="login-form-container">

                <div className="login-form" > <animated.div style={formSpring}>
                {showCreateAccount && (<>

                    <h3> 
                    Create Account
                    </h3>

                    <div className="form-group">
                        <TextField label="EmailAddress"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle/>
                              </InputAdornment>
                            ),
                          }}
                         id="username" 
                        placeholder="austin@resumerocket.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="standard"/>
                    </div>

                    <div className="form-group">
                    <TextField
                        fullWidth
                        id="password"
                        variant="standard"
                        placeholder="password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Lock/>
                                </InputAdornment>
                              ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    onMouseLeave={handleMouseUpPassword}
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                          }}
                    />
                    </div>

                    <div className="form-group">
                    <TextField
                        fullWidth
                        id="confirmPassowrd"
                        variant="standard"
                        required
                        placeholder="confirm password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassowrd}
                        onChange={handleChange('confirmPassowrd')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Lock/>
                                </InputAdornment>
                              ),
                          }}
                    />
                    </div>

                    <div className="form-actions internal-block">
                      <Button className="button loginButton" onClick={handleCreateAccount}>Create Account</Button>
                    </div>


                </>)}
                {showLogin && (<>
                    <h3> 
                    Login
                    </h3>

                    <div className="form-group">
                        <TextField label="EmailAddress"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle/>
                              </InputAdornment>
                            ),
                          }}
                         id="username" 
                        placeholder="austin@resumerocket.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="standard"/>
                    </div>

                    <div className="form-group">
                    <TextField
                        fullWidth
                        id="password"
                        variant="standard"
                        placeholder="password"
                        required
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Lock/>
                                </InputAdornment>
                              ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    onMouseLeave={handleMouseUpPassword}
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                          }}
                    />
                    </div>

                    <div className="form-actions internal-block">
                      <Button className="button loginButton" onClick={handleLogin}>Login</Button>
                    </div>

                </>)}
                </animated.div>

                <div className="form-actions">
                
                    { !(showLogin || showCreateAccount ) && <Button  className="button loginButton" onClick={handleLogin}>Login</Button>} 

                    <div className="dividerContainer">
                        <hr className="divider" />
                        <span className="dividerText">or</span>
                        <hr className="divider" />
                    </div>

                  <Button className="button createButton" onClick={!showCreateAccount ? handleCreateAccount : handleLogin}>{showCreateAccount ? "Login" : "Create Account"}</Button>

                </div>
            
            </div>
        </div>
    </div>
);};

export default LoginForm;

