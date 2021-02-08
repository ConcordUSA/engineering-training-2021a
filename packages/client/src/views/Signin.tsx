import React from 'react';
import { Paper, Button, TextField, Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppTheme from '../styles/theme';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            height: '100%',
            width: '100%'
        },
        paper: {
            marginTop: '5%',
            marginBottm: '5%',
            height: '90%',
            width: '90%',
            textAlign: 'center'
        },
        logo: {
            marginTop: '2%',
            marginBottm: '5%',
        },
        FourSeason: {
            marginTop: '0.35em',
        },
      loginText: {
          marginLeft:" 25%"
        },
      formContainer: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '10%',
        textAlign: 'center'
        
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            color: AppTheme.primaryText,
            width: '30%',
            backgroundColor: AppTheme.primary,
            '&:hover': {
                backgroundColor: AppTheme.secondary,
              }
        },
        btnDiv: {
            width: "100%"
        },
        links: {
            margin: '5px'
        },
        mainDiv: {
            marginTop: '40px',

        },
        accountInput: {
            width: "50%",
            margin: "5px",
      
          },
    })
);
export default function SignIn() {
  const classes = useStyles();
    return (
    <div className={classes.root}>
            <Paper className={classes.paper}>
                <Container maxWidth="sm" component="main" className={classes.mainDiv}>
                   
                    <img src="fstd-logo-colorized.png" alt="Four Seasons Total Development Logo, flower, sun, leaf, snowflake" className={classes.logo}/>
               
                <Typography component="h1" variant="h3" align="center" color="textPrimary"  gutterBottom className={classes.FourSeason}>
                FOUR SEASONS
                </Typography>
                <Typography variant="h5" align="center"  component="p">
                TOTAL DEVELOPMENT
                </Typography>
          </Container>
          <div className={classes.formContainer}>
            <Typography variant="h6" align="left"  component="p" className={classes.loginText}>
              LOGIN: 
              </Typography>
            <form noValidate>
              <TextField
                className={classes.accountInput}
                variant="outlined"
                margin="normal"
                required    
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                className={classes.accountInput}
                variant="outlined"
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
          <div>
            <Button
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                Submit
              </Button>
            </div>
              <div className={classes.btnDiv}>
                <Link to="/createAccount" className={classes.links}>
                  Forgot Password?
                </Link>
                OR
                <Link to="/createAccount" className={classes.links}>
                  Create Account
              </Link>
            </div>
            </form>
          </div>
    </Paper>
    </div>
  );
}















