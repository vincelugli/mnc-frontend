from fastapi import FastAPI
from config import CLIENT_SECRET, CLIENT_ID, DISCORD_TOKEN_URL
import aiohttp
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client_session = aiohttp.ClientSession()


@app.get('/auth')
async def read_auth(code: str | None = None):
    payload = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'https://mnc.pages.dev/',
    }
    async with client_session.post(
        DISCORD_TOKEN_URL,
        data=payload,
    ) as resp:
        response_json = await resp.json()

        return response_json
