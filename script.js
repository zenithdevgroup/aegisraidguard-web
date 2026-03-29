document.addEventListener('DOMContentLoaded', () => {
    // Verificar si estamos en el dashboard
    if (window.location.pathname.includes('dashboard')) {
        const urlParams = new URLSearchParams(window.location.search);
        
        const userId = urlParams.get('id');
        const username = urlParams.get('username');
        const globalName = urlParams.get('global_name');
        const avatarHash = urlParams.get('avatar');

        if (userId && username) {
            // Guardar sesión en sessionStorage
            sessionStorage.setItem('arg_user', JSON.stringify({ userId, username, globalName, avatarHash }));
            
            // Limpiar la URL para que no queden expuestos los parámetros (UX/UI Clean)
            window.history.replaceState({}, document.title, window.location.pathname);
            
            renderUserProfile(userId, username, globalName, avatarHash);
        } else {
            // Si no hay params, intentar recuperar de la sesión
            const sessionData = JSON.parse(sessionStorage.getItem('arg_user'));
            if (sessionData) {
                renderUserProfile(sessionData.userId, sessionData.username, sessionData.globalName, sessionData.avatarHash);
            } else {
                // Si no hay sesión, devolver al index
                window.location.href = '/';
            }
        }
    }

    // Botón de Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            sessionStorage.removeItem('arg_user');
        });
    }
});

function renderUserProfile(id, username, globalName, avatarHash) {
    const nameEl = document.getElementById('userName');
    const idEl = document.getElementById('userId');
    const avatarEl = document.getElementById('userAvatar');

    nameEl.textContent = globalName || username;
    idEl.textContent = `ID: ${id}`;

    if (avatarHash) {
        avatarEl.src = `https://cdn.discordapp.com/avatars/${id}/${avatarHash}.png`;
    } else {
        // Fallback default de Discord si no tiene avatar
        const defaultAvatarIndex = (BigInt(id) >> 22n) % 6n;
        avatarEl.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
    }
    avatarEl.style.display = 'block';
}
