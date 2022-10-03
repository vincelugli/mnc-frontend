import {DISCORD_API_VERSION, DISCORD_BASE, DISCORD_OAUTH_TOKEN, DISCORD_USER} from "./api";

const CLIENT_ID = 'TODO: ADD APPLICATION CLIENT_ID';
const CLIENT_SECRET = 'TODO: ADD APPLICATION CLIENT_SECRET';
const BACKEND_API = 'https://toxic-api-production.gggrunt16.workers.dev';

export interface ClientToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    error?: string;
    error_description?: string;
}

export interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner?: string;
    accent_color?: number;
    locale?: string;
    verified?: boolean;
    email?: string;
    flags?: number;
    premium_type?: number;
    public_flags?: number;
}

// Gets access token from the frontend
// (here as an example, probably best to do this on the backend)
export async function getAccessTokens(clientCode: string): Promise<ClientToken> {
    const bodyParams = new URLSearchParams();
    bodyParams.append('client_id', CLIENT_ID);
    bodyParams.append('client_secret', CLIENT_SECRET);
    bodyParams.append('grant_type', 'authorization_code');
    bodyParams.append('code', clientCode);
    bodyParams.append('redirect_uri', 'http://localhost:3000/'/*'e.g. https://mnc.pages.dev/'*/);

    const tokenRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyParams
    };
    const response = await fetch(`${DISCORD_BASE+DISCORD_API_VERSION+DISCORD_OAUTH_TOKEN}`, tokenRequestOptions);
    const json = await response.json();

    return json as ClientToken;
}

// Gets the user info, provided an access token and token type.
export async function getUser(accessToken: String, tokenType: String): Promise<User> {
    const identityRequestOptions = {
        method: 'GET',
        headers: {
            'authorization': `${tokenType} ${accessToken}`
        }
    }
    const userResponse = await fetch(`${DISCORD_BASE+DISCORD_API_VERSION+DISCORD_USER}`, identityRequestOptions);
    const userJson = await userResponse.json();

    return userJson as User;
}

// Sends request to backend with discord code as query param.
export async function getAccessTokenBackend(code: string): Promise<ClientToken> {
    const response = await fetch(`${BACKEND_API}/auth?code=${code}`);

    return await response.json() as ClientToken;
}
