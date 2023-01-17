import axios from "axios";


interface Params{
  vs_currency: string;
  page: number;
  per_page: number;
  price_change_percentage: string;
}

export interface Coin {
  id: string,
  symbol: string,
  name: string,
  image: string,
  current_price: number,
  market_cap: number,
  market_cap_rank: number,
  fully_diluted_valuation: number,
  total_volume: number,
  high_24h: number,
  low_24h: number,
  price_change_24h: number,
  price_change_percentage_24h: number,
  market_cap_change_24h: number,
  market_cap_change_percentage_24h: number,
  circulating_supply: number,
  total_supply: number,
  max_supply: number,
  ath: number,
  ath_change_percentage: number,
  ath_date: Date,
  atl: number,
  atl_change_percentage: number,
  atl_date: Date,
  roi: null,
  last_updated: Date,
  price_change_percentage_24h_in_currency: number,
  price_change_percentage_7d_in_currency: number
}


const customAxios = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
});

customAxios.interceptors.request.use((config) => config, function (error) {
    console.error("there was something wrong in your configs");
    
  return Promise.reject(error);
});

customAxios.interceptors.response.use((response): any => {  
    const convertedResponse: Coin[] = response.data;
  return convertedResponse;
}, function (error) {
  console.error("there was something wrong in your response");
  return Promise.reject(error);
});

export const getCoins = (page: number=1) => {
//   console.log("params for get Conins", params);

  const params: Params ={
    page,
    per_page: 10,
    price_change_percentage: "24h,7d",
    vs_currency: "usd",
  }
  return customAxios.get("coins/markets", {
    params,
  });
};
