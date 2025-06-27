export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = '586c7181891f4332fb7b1b41319061b6';
  const { taskId } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: 'taskId is required' });
  }

  try {
    const response = await fetch('https://api.speedyindex.com/v2/task/google/indexer/vip', {
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task_id: taskId }),
    });

    const data = await response.json();

    if (data.code !== 0) {
      return res.status(500).json({ error: data.msg || 'Failed to add to VIP queue' });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
}
