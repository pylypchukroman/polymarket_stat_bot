import axios from 'axios';
import { slug } from '../data/consts';
import { logger } from '../slack/logger';

export async function fetchMarket() {
  const url = `https://gamma-api.polymarket.com/markets?slug=${slug}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    logger.error('Axios fetch error:');
    return null;
  }
}
