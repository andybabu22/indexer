export default async function handler(req, res) {
  const API_KEY = '586c7181891f4332fb7b1b41319061b6';
  const { url } = req.body;
  const resp = await fetch('https://api.speedyindex.com/v2/task/google/indexer/create', {
    method: 'POST',
    headers: { Authorization: API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: url, urls: [url] })
  });
  res.status(200).json(await resp.json());
}
