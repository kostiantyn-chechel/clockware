import React  from 'react';
import axios from 'axios';
import * as queryString from 'query-string';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const FacebookAuth: React.FC = (props) => {
    const classes = useStyles();

    // const stringifiedParams = queryString.stringify({
    //     client_id: process.env.APP_ID_GOES_HERE,
    //     // redirect_uri: 'https://www.example.com/authenticate/facebook/',
    //     redirect_uri: 'https://localhost/auth/facebook/',
    //     scope: ['email', 'public_profile'].join(','), // comma seperated string
    //     response_type: 'code',
    //     auth_type: 'rerequest',
    //     display: 'popup',
    // });

    // async function getAccessTokenFromCode(code) {
    //     const { data } = await axios({
    //         url: 'https://graph.facebook.com/v4.0/oauth/access_token',
    //         method: 'get',
    //         params: {
    //             client_id: process.env.APP_ID_GOES_HERE,
    //             client_secret: process.env.APP_SECRET_GOES_HERE,
    //             redirect_uri: 'https://www.example.com/authenticate/facebook/',
    //             code,
    //         },
    //     });
    //     console.log(data); // { access_token, token_type, expires_in }
    //     return data.access_token;
    // };

    // const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

    return (
        <React.Fragment>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
                onClick={()=>{}}
            >
                Facebook
            </Button>
        </React.Fragment>
    );
};

export default FacebookAuth;