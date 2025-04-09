import FormData from 'form-data';
import axios from 'axios';
import axiosRetry from 'axios-retry';

export default async function handler(req, res) {
  const DOTE_UUID = 'a1bcb9dd-c455-417c-bcbe-3073a9593113';
  const type = 'schema.cassproject.org.0.4.Framework';
  
  const cassUrl = 'http://cass.cass.svc.cluster.local';
  const compSearchUrl = `${cassUrl}/api/data/${type}/${DOTE_UUID}`;
  
  try {
    const client = axios.create();
    axiosRetry(client, { 
      retries: 3, 
      shouldResetTimeout: true,
      retryDelay: axiosRetry.exponentialDelay
    });
    
    let data = new FormData();
    data.append('signatureSheet', '[]');
    
    const response = await client.post(compSearchUrl, data, {
      headers: {
        ...data.getHeaders()
      },
      timeout: 10000
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('CASS API error');

    res.status(error.response?.status || 500).json({ 
      error: 'Failed to fetch competency data', 
      message: error.message,
      fallback: true
    });
  }
}