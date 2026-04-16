/**
 * GitHub OAuth - Step 1: Redirect to GitHub authorization
 * 
 * Decap CMS opens a popup to /api/auth?provider=github&site_id=...
 * We redirect to GitHub OAuth with our client_id.
 */
export default function handler(req, res) {
  const { provider, site_id } = req.query;

  if (provider !== 'github') {
    return res.status(400).send('Only GitHub provider is supported');
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('OAuth not configured: GITHUB_CLIENT_ID missing');
  }

  const scope = 'repo,user';
  const state = Buffer.from(JSON.stringify({ provider, site_id: site_id || '' })).toString('base64');

  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('scope', scope);
  githubAuthUrl.searchParams.set('state', state);

  res.redirect(302, githubAuthUrl.toString());
}
