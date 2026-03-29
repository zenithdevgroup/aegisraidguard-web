export default async function handler(req, res) {
    const { code } = req.query;
    
    if (!code) {
        return res.redirect('/?error=access_denied');
    }

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;

    try {
        // 1. Intercambiar el código por el Access Token
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
            }),
        });

        const tokenData = await tokenResponse.json();
        
        if (!tokenData.access_token) {
            throw new Error('Error al obtener el token de Discord');
        }

        // 2. Obtener los datos del usuario logueado
        const userResponse = await fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });

        const userData = await userResponse.json();

        // 3. Redirigir al dashboard enviando los datos de forma segura por URL
        // El frontend capturará esto y limpiará la URL inmediatamente
        const queryParams = new URLSearchParams({
            id: userData.id,
            username: userData.username,
            avatar: userData.avatar || '',
            global_name: userData.global_name || userData.username
        });

        res.redirect(`/dashboard.html?${queryParams.toString()}`);
        
    } catch (error) {
        console.error('OAuth Error:', error);
        res.redirect('/?error=auth_failed');
    }
}
