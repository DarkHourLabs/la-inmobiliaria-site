/**
 * GitHub OAuth proxy for Decap CMS
 * Handles both the initial redirect and the OAuth callback/token exchange.
 *
 * Required env vars in Vercel dashboard:
 *   GITHUB_CLIENT_ID      — from your GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  — from your GitHub OAuth App
 *
 * GitHub OAuth App settings:
 *   Homepage URL:                  https://lainmobiliaria.mx
 *   Authorization callback URL:    https://lainmobiliaria.mx/api/auth
 */

export default async function handler(req, res) {
  const { code, error, error_description } = req.query;

  // Handle OAuth error from GitHub
  if (error) {
    return res.status(200).send(renderMessage('error', { message: error_description || error }));
  }

  // Step 1: No code yet — redirect to GitHub for authorization
  if (!code) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).send('GITHUB_CLIENT_ID not configured');
    }
    const redirectUri = 'https://lainmobiliaria.mx/api/auth';
    const scope = 'repo,user';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    return res.redirect(authUrl);
  }

  // Step 2: Exchange code for access token
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(200).send(renderMessage('error', { message: 'OAuth not configured on server' }));
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (data.error) {
      return res.status(200).send(renderMessage('error', { message: data.error_description || data.error }));
    }

    return res.status(200).send(renderMessage('success', {
      token: data.access_token,
      provider: 'github',
    }));
  } catch (err) {
    console.error('OAuth error:', err);
    return res.status(200).send(renderMessage('error', { message: 'Server error during token exchange' }));
  }
}

function renderMessage(status, data) {
  const provider = 'github';
  const message = `authorization:${provider}:${status}:${JSON.stringify(data)}`;
  return `<!DOCTYPE html>
<html>
<head><title>Autenticando...</title></head>
<body>
<script>
(function() {
  var message = ${JSON.stringify(message)};
  function receiveMessage(e) {
    window.opener.postMessage(message, e.origin);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:${provider}', '*');
})();
</script>
<p>${status === 'success' ? 'Autenticación exitosa. Cerrando...' : 'Error: ' + (data.message || '')}</p>
</body>
</html>`;
}
