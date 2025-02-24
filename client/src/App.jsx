import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'

function App() {
  const [loginForm, setLoginForm] = useState({
      email: "",
      password: "",
  })
  const [loginErrors, setLoginErrors] = useState({
      email: "",
      password: "",
  })
  const navigate = useNavigate();


  const handleLogin = async () => {
      try {
          const response = await axios.post("/api/auth", loginForm);
          const data = response.data;
          const status = response.status;
          console.log(data, status);
          setLoginErrors({});
          navigate("/app/home")
      } catch (error) {
          console.log(error.response.data.errors);
          setLoginErrors(error.response?.data?.errors);
      }
  }

  return (
    <>
      <Container 
          maxWidth="xs" 
          sx={{
              mt: 4,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "auto", 
              bgcolor: "#f5f5f5", 
              borderRadius: 2, 
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",     

          }}>
            
          <Typography variant="h2" >
              Login
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={2}>
              <TextField
                  type="email"
                  variant="outlined"
                  placeholder="example@email.com"
                  label="Email"
                  value={loginForm.email || ""}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  error={loginErrors?.email ? true : false}
                  helperText={loginErrors?.email ? loginErrors?.email.message : ""}
              />
              <TextField
                  type="password"
                  variant="outlined"
                  label="Password"
                  value={loginForm.password || ""}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  error={loginErrors?.password ? true : false}
                  helperText={loginErrors?.password ? loginErrors?.errors.message : ""}
              />
              <Button variant="contained" color="primary" onClick={handleLogin} >Login</Button>
          </Stack>
      </Container>
  </>
  )
}

export default App
