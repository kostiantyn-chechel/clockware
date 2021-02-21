import React  from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { userFacebookLoginFetch } from '../../store/actions/authAction';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const FacebookAuth: React.FC = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const signIn = async () => {
        // @ts-ignore
        const { authResponse } = await new Promise(window.FB.getLoginStatus);
        if (authResponse) {
            console.log('(1)уже вошли authResponse', authResponse);
            dispatch(userFacebookLoginFetch(authResponse.accessToken));
        // } else {
        //     // @ts-ignore
        //     const { authResponse } = await new Promise(window.FB.login(()=>{}, {scope: 'public_profile,email'}));
        //     if (!authResponse) return;
        //     console.log('(2)входим первый раз');
        //     dispatch(userFacebookLoginFetch(authResponse.accessToken));
        // }
        } else {
            // @ts-ignore
            window.FB.login(({ authResponse }) => {
                if (!authResponse) return;
                console.log('(2)входим первый раз');
                dispatch(userFacebookLoginFetch(authResponse.accessToken));
            }, {scope: 'public_profile,email'});
        }
    };

    function logout() {
        // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
        // + выход из аккаутна FB
        // @ts-ignore
        window.FB.logout(function(response) {
            console.log('response', response);
            // @ts-ignore
            FB.Auth.setAuthResponse(null, 'unknown');
        });

    }

    // const mockToken = () => {
    //     const token = 'EAAMSObAjdocBAEUFHLJUvaAZAIGt2Ln7hfFOqexLenfnyFHMcZCZCYoxCDqhOtdwtDm3sHsQehL3IDwv6BnQ3n0VfyZC2UZBcw5Rj3p2JYMn1yIUWrZBzE6pJSh7HPmtO4Vj5PxPuHViTXTEDud19ehCaemZABOFQEt8qv4Bi3WG8b1WDX0TVmNK3UleeOx6ZCboPZBjEI0aZBKgZDZD';
    //     dispatch(userFacebookLoginFetch(token));
    // };

    return (
        <React.Fragment>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
                onClick={signIn}
                // onClick={logout}
            >
                Facebook
            </Button>
        </React.Fragment>
    );
};

export default FacebookAuth;