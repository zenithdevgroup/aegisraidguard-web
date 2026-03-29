import axios from "axios";

export default async function handler(req, res) {
  const code = req.query.code;
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  try {
    const tokenRes = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const access_token = tokenRes.data.access_token;

    const userRes = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    // Redirigir a dashboard con datos en query string
    res.redirect(
      `/dashboard.html?username=${userRes.data.username}&id=${userRes.data.id}&avatar=${userRes.data.avatar}`
    );
  } catch (err) {
    console.error(err);
    res.send("Error en login");
  }
}
