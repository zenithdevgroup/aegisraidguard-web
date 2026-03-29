export default async function handler(req, res) {
  const code = req.query.code;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  try {
    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI
      }).toString()
    });

    const tokenData = await tokenRes.json();
    const access_token = tokenData.access_token;

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${access_token}` }
    });
    const userData = await userRes.json();

    res.redirect(
      `/dashboard.html?username=${encodeURIComponent(userData.username)}&id=${userData.id}&avatar=${userData.avatar}`
    );
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).send("Error en login");
  }
}
