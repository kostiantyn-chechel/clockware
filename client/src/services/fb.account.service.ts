
export const accountService = {
    login,
    logout,
};

async function login() {
    // login with facebook then authenticate with the API to get a JWT auth token
    // @ts-ignore
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;


    // отправка токена на сервер через redux, получение токена от сервака
    // await apiAuthenticate(authResponse.accessToken);

    // get return url from location state or default to home page
    // const { from } = history.location.state || { from: { pathname: "/" } };
    // history.push(from);
}

function logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    // + выход из аккаутна FB
    // @ts-ignore
    window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());

}