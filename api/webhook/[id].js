// api/webhook.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const body = req.body; // Vercel automatically parses JSON if Content-Type is application/json
      console.log('Webhook received:', body);

      // Here you can do whatever you want with the data
      // For example, send it somewhere else, save it, etc.

      res.status(200).json({ status: 'success', received: body });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'error', message: err.message });
    }
  } else {
    // Only allow POST
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}
