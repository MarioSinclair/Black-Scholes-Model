from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from black_scholes import black_scholes_calculation

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Parameters(BaseModel):
    S: float
    K: float
    T: float
    V: float
    R: float

@app.post("/price")
async def get_option_price(params: Parameters):
    call_price, put_price = black_scholes_calculation(params.S, params.K, params.T, params.V, params.R)
    call_price = round(call_price, 2)
    put_price = round(put_price, 2)

    return {
        "call_price": call_price,
        "put_price": put_price
    }