document.addEventListener('DOMContentLoaded', () => {
    const isDashboard = window.location.pathname.includes('dashboard');
    if (isDashboard) {
        initAuth();
        initNavigation();
        loadDynamicData();
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
        avatarEl.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
    }
    avatarEl.style.display = 'block';
}

function initNavigation() {
    const links = document.querySelectorAll('.nav-links a[data-target]');
    const views = document.querySelectorAll('.view-section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const target = link.getAttribute('data-target');
            views.forEach(v => {
                v.classList.remove('active');
                if (v.id === target) v.classList.add('active');
            });
        });
    });
}

function loadDynamicData() {
    // Datos de ejemplo
    const servers = [
        { name: 'ARG Official', icon: '🛡️', active: true },
        { name: 'Dev Server', icon: '💻', active: true },
        { name: 'Community X', icon: '🌐', active: false }
    ];

    const logs = [
        { date: 'Hoy, 12:00', srv: 'ARG Official', threat: 'Raid Attempt', action: 'Locked', status: 'success' },
        { date: 'Ayer, 21:30', srv: 'Dev Server', threat: 'Spam Burst', action: 'Muted', status: 'success' }
    ];

    document.getElementById('serversCount').textContent = servers.filter(s => s.active).length;
    
    document.getElementById('serversContainer').innerHTML = servers.map(s => `
        <div class="server-item">
            <div style="display:flex; align-items:center; gap:10px;">
                <div class="server-icon">${s.icon}</div>
                <div><b>${s.name}</b><br><small>${s.active ? 'Activo' : 'Offline'}</small></div>
            </div>
            <button class="btn-sm ${s.active ? 'btn-primary' : 'btn-discord'}">${s.active ? 'Panel' : 'Invitar'}</button>
        </div>
    `).join('');

    document.getElementById('logsContainer').innerHTML = logs.map(l => `
        <tr>
            <td>${l.date}</td>
            <td>${l.srv}</td>
            <td><span class="badge danger">${l.threat}</span></td>
            <td>${l.action}</td>
            <td><span class="badge success">OK</span></td>
        </tr>
    `).join('');
}
