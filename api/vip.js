export default async function handler(req, res) {
  const API_KEY = '…';
  const { taskId } = req.body;
  const resp = await fetch('https://api.speedyindex.com/v2/task/google/indexer/status', {
    method: 'POST',
    headers: { Authorization: API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ task_ids: [taskId] })
  });
  res.status(200).json(await resp.json());
}
