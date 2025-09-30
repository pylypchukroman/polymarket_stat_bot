import { fetchMarket } from './fetchMarket';

export async function getClobTokenIds(): Promise<{ Yes: string; No: string } | null> {
  const market = await fetchMarket();

  if (market) {
    const first = JSON.parse([...market][0].clobTokenIds);

    if (first.length >= 2) {
      return {
        Yes: first[0],
        No: first[1],
      };
    }
  }

  return null;
}
