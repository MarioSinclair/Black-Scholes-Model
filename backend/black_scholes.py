import numpy as np
from scipy.stats import norm

def black_scholes_calculation(S, K, T, R, V):
                            
    d1 = (np.log(S/K) + (R + (V**2) * 0.5) * T) / (V*np.sqrt(T))
    d2 = d1 - V * np.sqrt(T)

    call_price = S*norm.cdf(d1) - (K * np.exp(-R * T) * norm.cdf(d2))
    put_price = (K * np.exp(-R * T) * norm.cdf(-d2)) - (S * norm.cdf(-d1))

    return call_price, put_price


def greeks_calculation(S, K, T, R, V, option_type='call'):
    option_type = option_type

    d1 = (np.log(S/K) + (R + (V**2) * 0.5) * T) / (V*np.sqrt(T))
    d2 = d1 - V * np.sqrt(T)

    if option_type == 'call':
        delta = norm.cdf(d1)
        theta = (-S * norm.pdf(d1) * V / (2 * np.sqrt(T))) - R * K * np.exp(-R * T) * norm.cdf(d2)
        rho = K * T * np.exp(-R * T) * norm.cdf(d2)
    else:
        delta = norm.cdf(d1) - 1
        theta = (-S * norm.pdf(d1) * V / (2 * np.sqrt(T))) + R * K * np.exp(-R * T) * norm.cdf(-d2)
        rho = -K * T * np.exp(-R * T) * norm.cdf(-d2)

    gamma = norm.pdf(d1) / (S * V * np.sqrt(T))
    vega = S * norm.pdf(d1) * np.sqrt(T)

    return {
        "delta": delta,
        "gamma": gamma,
        "vega": vega / 100,   # per 1% vol change
        "theta": theta / 365, # per day
        "rho": rho / 100,      # per 1% rate change
        "option_type": option_type
    }


class Parameters:
    def __init__(self, stock_price, strike_price, time_to_expiration, volatility, risk_free_interest):
        self.stock_price = stock_price
        self.strike_price = strike_price
        self.time_to_expiration = time_to_expiration
        self.volatility = volatility
        self.risk_free_interest = risk_free_interest


class GParameters:
    def __init__(self, stock_price, strike_price, time_to_expiration, volatility, risk_free_interest, option_type):
        self.stock_price = stock_price
        self.strike_price = strike_price
        self.time_to_expiration = time_to_expiration
        self.volatility = volatility
        self.risk_free_interest = risk_free_interest
        self.option_type = option_type