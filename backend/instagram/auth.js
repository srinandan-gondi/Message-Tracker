const INSTAGRAM_TOKEN_URL = 'https://api.instagram.com/oauth/access_token';
const INSTAGRAM_LONG_TOKEN_URL = 'https://graph.instagram.com/access_token';

export async function getInstagramAccessToken(authCode) {
    // GETTING SHORT-LIVED TOKEN
    const params = new URLSearchParams({
        client_id: 906251684178749,
        client_secret: "client secret",
        grant_type: "authorization_code",
        redirect_uri: chrome.identity.getRedirectURL(),
        code: authCode
    });

    const response = await fetch(INSTAGRAM_TOKEN_URL, {
        method: 'POST',
        body: params.toString()
    });

    if (!response.ok) {
        throw new Error('Failed to get access token');
    }

    // GETTING LONG-LIVED TOKEN WITH THE SHORT-LIVED TOKEN
    const access_token = await response.json();
    const params1 = new URLSearchParams({
        grant_type: 'ig_exchange_token',
        client_secret: "client secret",
        access_token: access_token
    });

    const response1 = await fetch(INSTAGRAM_LONG_TOKEN_URL, {
        method: 'GET',
        body: params.toString()
    });

    if (!response.ok) {
        throw new Error('Failed to get access token');
    }

    return await response.json();
}


