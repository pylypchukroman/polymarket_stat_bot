import { getSlugET } from './getSlugET';
import axios from 'axios';

export async function fetchMarket(topic: string) {
  const slug = getSlugET(topic);
  const url = `https://gamma-api.polymarket.com/markets?slug=${slug}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error('Axios fetch error:');
    return null;
  }
}
