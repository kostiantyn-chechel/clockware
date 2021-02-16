import React, {useEffect} from 'react';

function GoogleFacebookAuth(props) {

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

            // метод возвращает объект пользователя
            // где есть все необходимые нам поля
            const profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());

            // токен
            const id_token = googleUser.getAuthResponse().id_token;
            console.log('ID Token: ' + id_token)
        })
    };

    const signOut = () => {
        // @ts-ignore
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
            console.log('User signed out.')
        })
    };

    return (
        <React.Fragment>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
            <button onClick={signIn}>Log in</button>
            <button onClick={signOut}>Log out</button>
        </React.Fragment>
    );
}

export default GoogleFacebookAuth;