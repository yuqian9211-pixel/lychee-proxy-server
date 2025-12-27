// LycheeIP Proxy - Correct Version
export default async function handler(req, res) {
  // Allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Handle GET requests
  if (req.method === 'GET') {
    // If no URL parameter, show usage
    if (!req.query.url) {
      return res.json({
        status: 'ready',
        service: 'LycheeIP Proxy',
        usage: 'Add ?url=target_url',
        example: '/api/proxy?url=http://httpbin.org/ip'
      });
    }
    
    try {
      // ====== CONFIGURATION ======
      const user = 'YOUR_USERNAME';      // EDIT THIS
      const pass = 'YOUR_PASSWORD';      // EDIT THIS
      const host = 'proxy.lycheeip.com';
      const port = 'YOUR_PORT';          // EDIT THIS
      // ====== END CONFIG ======
      
      // Build proxy URL (use backticks, not quotes)
      const proxy = `http://${user}:${pass}@${host}:${port}`;
      
      // Remove http:// or https:// from target URL
      const url = req.query.url.replace(/^https?:\/\//, '');
      
      // Build final URL
      const finalUrl = `${proxy}/${url}`;
      
      // Make request through proxy
      const response = await fetch(finalUrl);
      const text = await response.text();
      
      // Return result
      res.send(text);
      
    } catch (error) {
      // Handle errors
      res.json({ 
        error: 'Proxy failed', 
        message: error.message 
      });
    }
  } else {
    // Only GET method supported
    res.status(405).json({ error: 'Method not allowed' });
  }
}
