
export function initFacebookSdk() {
    console.log('initFacebookSdk');
    return new Promise(resolve => {
        // @ts-ignore
        window.fbAsyncInit = function () {
            console.log('FACEBOOK_APP_I',process.env.REACT_APP_FACEBOOK_APP_ID);
            // @ts-ignore
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v9.0'
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