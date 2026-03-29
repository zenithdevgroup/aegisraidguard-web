export default async function handler(req, res) {
  const code = req.query.code;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  try {
    // Solicitar token
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
    console.log("Token Data:", tokenData);

    if (!tokenData.access_token) {
      return res.status(500).send("No se obtuvo access_token: " + JSON.stringify(tokenData));
    }

    // Solicitar datos de usuario
    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const userData = await userRes.json();
    console.log("User Data:", userData);

    if (!userData.username) {
      return res.status(500).send("No se obtuvo usuario: " + JSON.stringify(userData));
    }

    // Redirigir con datos
    res.redirect(
      `/dashboard.html?username=${encodeURIComponent(userData.username)}&id=${userData.id}&avatar=${userData.avatar}`
    );
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).send("Error en login: " + err.message);
  }
}
