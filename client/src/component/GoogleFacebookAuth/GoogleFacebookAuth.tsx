import React from 'react';
import Grid from '@material-ui/core/Grid';
import GoogleAuth from './GoogleAuth';
import FacebookAuth from './FacebookAuth';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    twoItem: {
        display: 'flex',
        justifyContent: 'space-around',
    },
}));

function GoogleFacebookAuth(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container className={classes.twoItem} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <GoogleAuth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FacebookAuth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default GoogleFacebookAuth;