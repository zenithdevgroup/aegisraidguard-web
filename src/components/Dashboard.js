`jsx // Archivo: Dashboard.js // Este archivo debe estar dentro de la carpeta de componentes de tu proyecto React, por ejemplo: src/components/Dashboard.js

import React, { useState, useEffect } from 'react';

const Dashboard = () => { // Estado del usuario autenticado const [user, setUser] = useState({ name: 'Usuario', id: '12345', avatar: 'https://via.placeholder.com/50' });

// Estado de servidores protegidos const [servers, setServers] = useState([ { id: '1', name: 'Servidor 1', icon: 'https://via.placeholder.com/30', active: true }, { id: '2', name: 'Servidor 2', icon: 'https://via.placeholder.com/30', active: false }, ]);

// Estado de controles de seguridad const [securitySettings, setSecuritySettings] = useState({ antiRaid: false, securityLevel: 'medio', activityLogs: true, });

// Estadísticas en vivo const [stats, setStats] = useState({ protectedUsers: 1500, blockedAttacks: 45, botStatus: servers.map(server => ({ id: server.id, status: server.active ? 'Activo' : 'Inactivo' })), });

// Persistencia de sesión con localStorage useEffect(() => { const savedUser = localStorage.getItem('user'); if (savedUser) { setUser(JSON.parse(savedUser)); }

const savedServers = localStorage.getItem('servers');
if (savedServers) {
  setServers(JSON.parse(savedServers));
}

const savedSecuritySettings = localStorage.getItem('securitySettings');
if (savedSecuritySettings) {
  setSecuritySettings(JSON.parse(savedSecuritySettings));
}

}, []);

useEffect(() => { localStorage.setItem('user', JSON.stringify(user)); localStorage.setItem('servers', JSON.stringify(servers)); localStorage.setItem('securitySettings', JSON.stringify(securitySettings)); }, [user, servers, securitySettings]);

// Función para activar/desactivar protección de un servidor const toggleServerProtection = (id) => { setServers(servers.map(server => server.id === id ? { ...server, active: !server.active } : server)); };

// Función para cambiar controles de seguridad const toggleSecuritySetting = (setting) => { setSecuritySettings({ ...securitySettings, [setting]: !securitySettings[setting] }); };

return ( <div> <h1>Dashboard de Gestión de Servidores</h1>

  <section>
    <h2>Perfil de Usuario</h2>
    <img src={user.avatar} alt="Avatar" />
    <p><strong>Nombre:</strong> {user.name}</p>
    <p><strong>ID:</strong> {user.id}</p>
    <button onClick={() => alert('Logout')}>Logout</button>
  </section>

  <section>
    <h2>Servidores Protegidos</h2>
    <ul>
      {servers.map(server => (
        <li key={server.id}>
          <img src={server.icon} alt="Icono" /> {server.name} - Estado: {server.active ? 'Activo' : 'Inactivo'}
          <button onClick={() => toggleServerProtection(server.id)}>
            {server.active ? 'Desactivar' : 'Activar'} Protección
          </button>
        </li>
      ))}
    </ul>
  </section>

  <section>
    <h2>Controles de Seguridad</h2>
    <label>
      <input
        type="checkbox"
        checked={securitySettings.antiRaid}
        onChange={() => toggleSecuritySetting('antiRaid')}
      />
      Anti-raid
    </label>
    <label>
      <select
        value={securitySettings.securityLevel}
        onChange={e => setSecuritySettings({ ...securitySettings, securityLevel: e.target.value })}
      >
        <option value="bajo">Bajo</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>
      Nivel de seguridad
    </label>
    <label>
      <input
        type="checkbox"
        checked={securitySettings.activityLogs}
        onChange={() => toggleSecuritySetting('activityLogs')}
      />
      Logs de actividad
    </label>
  </section>

  <section>
    <h2>Estadísticas en Vivo</h2>
    <p><strong>Usuarios protegidos:</strong> {stats.protectedUsers}</p>
    <p><strong>Ataques bloqueados:</strong> {stats.blockedAttacks}</p>
    <ul>
      {stats.botStatus.map(status => (
        <li key={status.id}>Servidor {status.id}: {status.status}</li>
      ))}
    </ul>
  </section>
</div>

); };

export default Dashboard;
