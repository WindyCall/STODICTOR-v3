import Button from "@mui/material/Button";
import { useAuth } from "../hooks/useAuth";
import * as React from "react";
import { useState } from "react";
import "../styles.css";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function PageLogin() {
  const {
    signInWithGoogle,
    createWithEmailAndPassword,
    signinWithEmailAndPassword
  } = useAuth();

  const [signInEmail, setSignInEmail] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");

  const [signInPassword, setSignInPassword] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  const [showMode, setShowMode] = useState("signin");

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleCreateAccount() {
    if (!getSameSignUpPassword()) {
      alert("Please confirm your password");
      return;
    }
    createWithEmailAndPassword(signUpEmail, signUpPassword);
    alert("Create succussfully");
  }

  function handleSignIn() {
    signinWithEmailAndPassword(signInEmail, signInPassword);
  }

  function getSigninPage() {
    return (
      <div>
        <h3> Sign in </h3>
        <br />
        <TextField
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
          id="input-with-icon-textfield"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
          variant="standard"
        />
        <br />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showSignInPassword ? "text" : "password"}
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showSignInPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <br />
        <br />
        <Button onClick={handleSignIn} variant="contained">
          Sign in
        </Button>
      </div>
    );
  }

  function getSameSignUpPassword() {
    return signUpPassword === confirmPassword;
  }

  function getSignupPage() {
    return (
      <div>
        <h3> Sign up </h3>
        <br />
        <TextField
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          id="input-with-icon-textfield"
          label="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
          variant="standard"
        />
        <br />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showSignUpPassword ? "text" : "password"}
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Confirm Password
          </InputLabel>
          <Input
            error={!getSameSignUpPassword()}
            id="standard-adornment-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <br />
        <br />
        <Button onClick={handleCreateAccount} variant="contained">
          Create new Acoount
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="LoginPage">
        <h1>LoginPage</h1>
        <Stack spacing={2} direction="row">
          <Button onClick={() => setShowMode("signin")} variant="outlined">
            Sign in
          </Button>
          <Button onClick={() => setShowMode("signup")} variant="outlined">
            Sign up
          </Button>
        </Stack>
        {showMode === "signin" ? getSigninPage() : getSignupPage()}
        <br />
        <br />
      </div>
    </>
  );
}
