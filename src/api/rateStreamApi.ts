export type RateEvent = {
  symbol: string;
  price: number;
  previousPrice: number | null;
  change: number;
  changeRate: number;
  updatedAt: string;
};

export const connectRateStream = (
  onMessage: (events: RateEvent[]) => void,
  onError?: () => void
) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const eventSource = new EventSource(`${baseUrl}/api/rates/stream`);

  eventSource.onmessage = (message) => {
    const data = JSON.parse(message.data) as RateEvent[];
    onMessage(data);
  };

  eventSource.onerror = () => {
    onError?.();
    eventSource.close();
  };

  return eventSource;
};
