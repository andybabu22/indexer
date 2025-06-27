export default async function handler(req, res) {
  const API_KEY = '586c7181891f4332fb7b1b41319061b6';
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const response = await fetch('https://api.speedyindex.com/v2/task/google/indexer/create', {
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: url, urls: [url] })
    });

    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      return res.status(response.status).json({ error: 'Non-JSON response', body: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
