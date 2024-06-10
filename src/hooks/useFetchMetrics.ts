import axios from 'axios';
import { useEffect, useState } from 'react';

interface SystemMetrics {
  timestamp: string;
  cpuUsage: number;
  ramUsage: number;
  temperature: number;
  storageUsage: number;
}

const useFetchMetrics = (startdate?: string, enddate?: string) => {
  const [data, setData] = useState<SystemMetrics[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${process.env.NEXT_PUBLIC_URL}/api/data`;
        if (startdate) {
          url += `?startdate=${startdate}`;
          if (enddate) {
            url += `&enddate=${enddate}`;
          }
        }

        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startdate, enddate]);

  return { data, loading, error };
};

export default useFetchMetrics;
