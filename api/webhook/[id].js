// api/webhook/[id].js
let logs = {}; // in-memory storage

export default function handler(req, res) {
    const { id } = req.query;

    // Ensure CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Clear logs if `clear` flag is sent in body
    if (req.method === 'POST' && req.body?.clear === true) {
        logs[id] = [];
        return res.status(200).json({ status: 'logs_cleared' });
    }

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
