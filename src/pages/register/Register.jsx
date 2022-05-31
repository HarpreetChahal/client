import React from 'react';
import Grid from '@mui/material/Grid';


import "./register.css";
import { Button, InputAdornment, TextField } from '@mui/material';
import { AccountCircle, Email, CalendarToday, Key, Face } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

export default function Register() {
  return (
    <div>
      <Grid container style={{ maxHeight:'100vh'}}>
        <Grid item xs={12} sm={6}>
          <img src="/assets/signup1.png" style={{ width:'100%', height: '100%' , objectFit: 'cover'}} alt="logo"/>

        </Grid>
        <Grid 
        container item xs={12} sm={6} 
        alignItems="center" 
        direction="column" 
        justify="space-between" 
        style={{padding:10}}
        >
          <div/>
          <div style={{ display:"flex", flexDirection:"column" ,maxWidth:400, minWidth:300}}>
            <Grid container justify="center">
              <img src="/assets/logo.png" 
              width={300}
              alt="logoname"
              />
              </Grid>
              <TextField label="first name" margin="normal" InputProps={{ startAdornment: <InputAdornment><AccountCircle color="primary"/></InputAdornment>}}/>
              <TextField label="last name" margin="normal" InputProps={{ startAdornment: <InputAdornment><Face color="primary"/></InputAdornment>}}/>
              <TextField label="email" margin="normal"InputProps={{ startAdornment: <InputAdornment><Email color="primary"/></InputAdornment>}}/>
              
              <TextField label="date of birth" margin="normal"InputProps={{ startAdornment: <InputAdornment><CalendarToday color="primary" /></InputAdornment>}}/>
              <TextField type="password" label="password" margin="normal"InputProps={{ startAdornment: <InputAdornment><Key color="primary"/></InputAdornment>}}/>
              
             <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign Up
              </Button>
              
              
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              
            
          </div>
          

        </Grid>
      </Grid>
    </div>
  );
}