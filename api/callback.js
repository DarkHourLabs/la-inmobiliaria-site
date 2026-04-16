/**
 * GitHub OAuth - Step 2: Handle callback, exchange code for token
 * 
 * GitHub redirects here after user authorizes.
 * We exchange the code for an access token and pass it back to Decap CMS
 * via a postMessage to the opener window.
 * 
 * Decap CMS expects: "authorization:github:success:{"token":"...","provider":"github"}"
 */
export default async function handler(req, res) {
  const { code, state, error, error_description } = req.query;

  if (error) {
    return res.status(200).send(renderMessage('error', { message: error_description || error }));
  }

  if (!code) {
    return res.status(200).send(renderMessage('error', { message: 'No code received from GitHub' }));
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(200).send(renderMessage('error', { message: 'OAuth not configured on server' }));
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
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

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(200).send(renderMessage('error', { message: tokenData.error_description || tokenData.error }));
    }

    return res.status(200).send(renderMessage('success', {
      token: tokenData.access_token,
      provider: 'github',
    }));
  } catch (err) {
    console.error('OAuth callback error:', err);
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
<p>${status === 'success' ? 'Autenticación exitosa. Cerrando...' : 'Error de autenticación: ' + (data.message || '')}</p>
</body>
</html>`;
}
