export default async function handler(req, res) {
  const CLIENT_ID = process.env.CLIENT_ID;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  // Construir la URL de autorización
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "identify"
  });

  // Redirigir al login de Discord
  res.redirect(`https://discord.com/api/oauth2/authorize?${params.toString()}`);
}
