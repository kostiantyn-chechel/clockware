
export function initFacebookSdk() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        // @ts-ignore
        window.fbAsyncInit = function () {
            // @ts-ignore
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v9.0'
            });

            // auto authenticate with the api if already logged in with facebook
            // вынести в отдельную
            // @ts-ignore
            window.FB.getLoginStatus(({ authResponse }) => {
                if (authResponse) {
                    // если уже аутентифицирован на ФБ
                    // accountService.apiAuthenticate(authResponse.accessToken).then(resolve);
                } else {
                    // @ts-ignore
                    resolve();
                }
            });
        };

        // load facebook sdk script
        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            // @ts-ignore
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}