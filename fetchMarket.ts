import axios from 'axios';
import { slug } from './Data/consts';

export async function fetchMarket() {
  const url = `https://gamma-api.polymarket.com/markets?slug=${slug}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error('Axios fetch error:');
    return null;
  }
}
