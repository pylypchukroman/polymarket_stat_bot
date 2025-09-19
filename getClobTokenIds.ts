import { fetchMarket } from './fetchMarket';

export async function getClobTokenIds(topic: string): Promise<{ Up: string; Down: string } | null> {
  const market = await fetchMarket(topic);

  if (market) {
    // Беремо перший знайдений ринок
    const first = JSON.parse([...market][0].clobTokenIds);

    if (first.length >= 2) {
      return {
        Up: first[0],
        Down: first[1],
      };
    }
  }

  return null;
}
