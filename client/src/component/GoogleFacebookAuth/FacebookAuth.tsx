import React from 'react';
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
            dispatch(userFacebookLoginFetch(authResponse.accessToken));
            return;
        } else {
            // @ts-ignore
            window.FB.login(({ authResponse }) => {
                if (!authResponse) return;
                dispatch(userFacebookLoginFetch(authResponse.accessToken));
            }, {scope: 'public_profile,email'});
        }
    };

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
            >
                Facebook
            </Button>
        </React.Fragment>
    );
};

export default FacebookAuth;