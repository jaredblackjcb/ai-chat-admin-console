import React from "react";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { googleAuth } from "../actions/userActions";

export default function Login() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user) || {};

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(login(data.get("email"), data.get("password")));
  };
  const handleGoogleAuthSuccess = (response) => {
    // Destructure the credential from the Google Sign-In response here
    const { credential } = response;
    // Call Google Auth action here, passing the  client token credential
    dispatch(googleAuth(credential));
  };

  const handleGoogleAuthFailure = (error) => {
    console.log("Google Sign-In failed:", error);
  };
  return (
    <Container component="main" maxWidth="xs">
      {/* TODO: Add custom error and loader components */}
      {error && <h1>{error}</h1>}
      {loading && <h1>Loading...</h1>}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleAuthSuccess(credentialResponse);
          }}
          onError={handleGoogleAuthFailure(error)}
        />
        <Grid sx={{ mt: 3 }} container>
          <Grid item xs>
            <Link to={"/resetPassword"}>Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link to={"/signup"}>{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
