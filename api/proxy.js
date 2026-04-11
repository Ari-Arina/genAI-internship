export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch('http://132.145.175.220:5678/webhook/ee959d54-e2c2-4c82-bd0b-61f68659f9f1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';
    res.setHeader('Content-Type', contentType);
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach n8n server' });
  }
}