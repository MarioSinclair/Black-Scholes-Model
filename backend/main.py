from fastapi import FastAPI
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from black_scholes import black_scholes_calculation
from black_scholes import greeks_calculation

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://black-scholes-pricing-ruddy.vercel.app",
                   "http://localhost:5173"
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Parameters(BaseModel):
    S: float
    K: float
    T: float
    R: float
    V: float

class GParameters(BaseModel):
    S: float
    K: float
    T: float
    R: float
    V: float
    option_type: str

@app.post("/api/price")
async def get_option_price(params: Parameters):
    call_price, put_price = black_scholes_calculation(params.S, params.K, params.T, params.R, params.V)
    call_price = round(call_price, 2)
    put_price = round(put_price, 2)

    return {
        "call_price": f"{call_price:.2f}",
        "put_price": f"{put_price:.2f}"
    }

@app.post("/api/greeks")
async def get_greeks(gparams: GParameters):
    greeks = greeks_calculation(gparams.S, gparams.K, gparams.T, gparams.R, gparams.V, gparams.option_type)
    return {"greeks": greeks}

@app.get("/api/greeks-plot")
async def get_greek_plot(
    param: str = Query(..., enum=["S", "K", "T", "R", "V"]),
    fixed_S: float = 100,
    fixed_K: float = 100,
    fixed_T: float = 1,
    fixed_R: float = 0.05,
    fixed_V: float = 0.2,
    option_type: str = "call"
):
    values = []
    greek_values = {"delta": [], "gamma": [], "vega": [], "theta": [], "rho": []}

    for i in range(50, 151):  # Adjust range as needed
        val = i / 100 if param in ["R", "V"] else i  # decimal for rates/vol
        args = {
            "S": fixed_S,
            "K": fixed_K,
            "T": fixed_T,
            "R": fixed_R,
            "V": fixed_V
        }
        args[param] = val

        greeks = greeks_calculation(
            args["S"], args["K"], args["T"], args["R"], args["V"], option_type
        )
        values.append(val)
        for key in greek_values:
            greek_values[key].append(greeks[key])

    return {"x": values, "greeks": greek_values}
