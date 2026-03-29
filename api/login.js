export default function handler(req, res) {
    const clientId = process.env.CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.REDIRECT_URI);
    // Solicitamos el scope 'identify' para obtener avatar, id y username
    const scope = 'identify'; 
    
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
    res.redirect(discordAuthUrl);
}
