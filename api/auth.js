/**
 * GitHub OAuth proxy for Decap CMS
 * Handles the OAuth callback and token exchange with GitHub.
 *
 * Required env vars in Vercel dashboard:
 *   GITHUB_CLIENT_ID      — from your GitHub OAuth App
 *   GITHUB_CLIENT_SECRET  — from your GitHub OAuth App
 *
 * GitHub OAuth App setup:
 *   Homepage URL:          https://lainmobiliaria.mx
 *   Authorization callback URL: https://la-inmobiliaria-houses-boutique.vercel.app/api/auth
 */

export default async function handler(req, res) {
  const { code, provider } = req.query;

  // Step 1: Redirect to GitHub for authorization
  if (!code) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).send('GITHUB_CLIENT_ID not configured');
    }
    const redirectUri = `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'https://la-inmobiliaria-houses-boutique.vercel.app'}/api/auth`;
    const scope = 'repo,user';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    return res.redirect(authUrl);
  }

  // Step 2: Exchange code for access token
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).send('GitHub OAuth credentials not configured');
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (data.error) {
      return res.status(400).send(`OAuth error: ${data.error_description || data.error}`);
    }

    const token = data.access_token;

    // Step 3: Return token to Decap CMS via postMessage
    const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script>
    `;

    return res.status(200).send(`<!DOCTYPE html><html><head><title>Authorizing...</title></head><body>${script}</body></html>`);
  } catch (err) {
    console.error('OAuth error:', err);
    return res.status(500).send('OAuth token exchange failed');
  }
}
