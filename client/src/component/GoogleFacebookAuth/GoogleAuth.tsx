import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { userGoogleLoginFetch } from '../../store/actions/authAction';

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const GoogleAuth: React.FC = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        const _onInit = auth2 => {
            console.log('init OK', auth2)
        };
        const _onError = err => {
            console.log('error', err)
        };
        // @ts-ignore
        window.gapi.load('auth2', function() {
            // @ts-ignore
            window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                })
                .then(_onInit, _onError)
        })
    }, []);

    const signIn = () => {
        // @ts-ignore
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(googleUser => {
            const id_token = googleUser.getAuthResponse().id_token;
            dispatch(userGoogleLoginFetch(id_token));
        });
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
                Google
            </Button>
        </React.Fragment>
    );
};

export default GoogleAuth;