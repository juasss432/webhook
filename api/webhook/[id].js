// api/webhook/[id].js
let logs = {}; // in-memory storage

export default function handler(req, res) {
  const { id } = req.query; // grabs the dynamic ID

  if (req.method === 'POST') {
    if (!logs[id]) logs[id] = [];
    logs[id].push({
      body: req.body,
      method: req.method,
      timestamp: Date.now()
    });
    return res.status(200).json({ status: 'ok' });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ logs: logs[id] || [] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
