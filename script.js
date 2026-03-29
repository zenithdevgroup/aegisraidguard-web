document.addEventListener('DOMContentLoaded', () => {
    const isDashboard = window.location.pathname.includes('dashboard');

    if (isDashboard) {
        initAuth();
        initNavigation();
        loadDynamicData();
    }

    // Botón de Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('arg_user');
        });
    }
});

function initAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const username = urlParams.get('username');
    const globalName = urlParams.get('global_name');
    const avatarHash = urlParams.get('avatar');

    if (userId && username) {
        sessionStorage.setItem('arg_user', JSON.stringify({ userId, username, globalName, avatarHash }));
        window.history.replaceState({}, document.title, window.location.pathname);
        renderUserProfile(userId, username, globalName, avatarHash);
    } else {
        const sessionData = JSON.parse(sessionStorage.getItem('arg_user'));
        if (sessionData) {
            renderUserProfile(sessionData.userId, sessionData.username, sessionData.globalName, sessionData.avatarHash);
        } else {
            window.location.href = '/';
        }
    }
}

function renderUserProfile(id, username, globalName, avatarHash) {
    document.getElementById('userName').textContent = globalName || username;
    document.getElementById('userId').textContent = `ID: ${id}`;
    const avatarEl = document.getElementById('userAvatar');
    
    if (avatarHash) {
        avatarEl.src = `https://cdn.discordapp.com/avatars/${id}/${avatarHash}.png`;
    } else {
        const defaultAvatarIndex = (BigInt(id) >> 22n) % 6n;
        avatarEl.src = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
    }
    avatarEl.style.display = 'block';
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a[data-target]');
    const views = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Actualizar clase activa en el menú
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Cambiar vista mostrada
            const targetId = link.getAttribute('data-target');
            views.forEach(view => {
                view.classList.remove('active');
                if(view.id === targetId) {
                    view.classList.add('active');
                }
            });
        });
    });
}

function loadDynamicData() {
    // Array simulando la respuesta de la API de Discord/Bot
    const userServers = [
        { id: '1', name: 'Comunidad Alpha', icon: 'CA', botPresent: true },
        { id: '2', name: 'Dev Hub', icon: 'DH', botPresent: true },
        { id: '3', name: 'Gaming Lounge', icon: 'GL', botPresent: false },
        { id: '4', name: 'Crypto Trading', icon: 'CT', botPresent: true }
    ];

    const securityLogs = [
        { date: 'Hoy, 14:32', server: 'Comunidad Alpha', threat: 'Spam Masivo Detectado', action: 'Usuarios Baneados (12)', status: 'success', statusText: 'Mitigado' },
        { date: 'Hoy, 10:15', server: 'Crypto Trading', threat: 'Intento de Nuke (Borrado de canales)', action: 'Admin Despojado de Roles', status: 'success', statusText: 'Bloqueado' },
        { date: 'Ayer, 22:40', server: 'Dev Hub', threat: 'Enlace Malicioso Detectado', action: 'Mensaje Eliminado', status: 'warning', statusText: 'Intervenido' }
    ];

    // Renderizar Servidores
    document.getElementById('serversCount').textContent = userServers.filter(s => s.botPresent).length;
    
    const serversContainer = document.getElementById('serversContainer');
    serversContainer.innerHTML = userServers.map(server => `
        <div class="server-item">
            <div class="server-meta">
                <div class="server-icon">${server.icon}</div>
                <div>
                    <div class="server-name">${server.name}</div>
                    <div class="server-status">${server.botPresent ? 'Protección Activa' : 'No configurado'}</div>
                </div>
            </div>
            <button class="${server.botPresent ? 'btn-sm btn-primary' : 'btn-sm btn-discord'}">
                ${server.botPresent ? 'Configurar' : 'Invitar Bot'}
            </button>
        </div>
    `).join('');

    // Renderizar Logs
    const logsContainer = document.getElementById('logsContainer');
    logsContainer.innerHTML = securityLogs.map(log => `
        <tr>
            <td style="color: var(--text-muted);">${log.date}</td>
            <td style="font-weight: 500;">${log.server}</td>
            <td><span class="badge danger">${log.threat}</span></td>
            <td>${log.action}</td>
            <td><span class="badge ${log.status}">${log.statusText}</span></td>
        </tr>
    `).join('');
}
