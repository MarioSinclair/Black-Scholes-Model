import numpy as np
from scipy.stats import norm

def black_scholes_calculation(stock_price, strike_price, time_to_expiration, volatility, risk_free_interest):
    S = stock_price
    K = strike_price
    T = time_to_expiration
    V = volatility
    R = risk_free_interest
                            
    d1 = (np.log(S/K) + (R + (V**2) * 0.5) * T) / (V*np.sqrt(T))
    d2 = d1 - V * np.sqrt(T)

    call_price = S*norm.cdf(d1) - (K * np.exp(-R * T) * norm.cdf(d2))
    put_price = (K * np.exp(-R * T) * norm.cdf(-d2)) - (S * norm.cdf(-d1))

    return call_price, put_price

class Parameters:
    def __init__(self, stock_price, strike_price, time_to_expiration, volatility, risk_free_interest):
        self.stock_price = stock_price
        self.strike_price = strike_price
        self.time_to_expiration = time_to_expiration
        self.volatility = volatility
        self.risk_free_interest = risk_free_interest
