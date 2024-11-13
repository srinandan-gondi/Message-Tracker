import config from "./config.js"

const TWITTER_AUTH_URL = 'https://twitter.com/i/oauth2/authorize';
const TWITTER_TOKEN_URL = 'https://api.twitter.com/2/oauth2/token';
// const INSTAGRAM_TOKEN_URL = 'https://api.instagram.com/oauth/access_token';
// const INSTAGRAM_LONG_TOKEN_URL = 'https://graph.instagram.com/access_token';

function generateCodeVerifier() {
    const array = new Uint32Array(56/2);
    crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export async function getAuthUrl() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: config.apiKey,
        redirect_uri: chrome.identity.getRedirectURL(),
        scope: 'dm.read users.read tweet.read',
        state: 'state',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
    });

    return {
        url: `${TWITTER_AUTH_URL}?${params.toString()}`,
        codeVerifier
    };
}

export async function getAccessToken(authCode, codeVerifier) {
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: chrome.identity.getRedirectURL(),
        client_id: config.apiKey,
        code_verifier: codeVerifier
    });

    const response = await fetch(TWITTER_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(config.apiKey + ':' + config.apiSecretKey)
        },
        body: params.toString()
    });

    if (!response.ok) {
        throw new Error('Failed to get access token');
    }

    return await response.json();
}

