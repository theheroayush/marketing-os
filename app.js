// MarkU Marketing Skills App - Main Application Logic
(function(){
  window.app = window.app || {};
  const app = window.app;
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  app.$ = $;
  app.$$ = $$;

  // Current state
  let currentView = 'dashboard';
  let catFilter = 'All';
  let searchQ = '';

  const footerHTML = `
    <div style="padding: 40px 20px 20px; text-align: center; color: var(--text-muted); font-size: 0.75rem; margin-top: 20px;">
      <button onclick="app.navigate('support')" style="background:none; border:none; color:var(--text-dim); text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px; margin-bottom:8px; font-weight:600; cursor:pointer; width:100%;">
        <span class="material-symbols-outlined" style="font-size:16px;">support_agent</span> Support & Feedback
      </button>
      &copy; 2026 MarkU
    </div>
  `;
  
  // Capgo Live Updates Integration
  const triggerHaptic = async (style = "LIGHT") => {
    if (window.Capacitor && window.Capacitor.isPluginAvailable("Haptics")) {
      const { Haptics, ImpactStyle } = window.Capacitor.Plugins;
      try { await Haptics.impact({ style: ImpactStyle[style] || ImpactStyle.Light }); } catch(e) {}
    }
  };
  app.triggerHaptic = triggerHaptic;
  const notifyReady = async () => {
    if (window.Capacitor && window.Capacitor.isPluginAvailable("CapacitorUpdater")) {
      try { await window.Capacitor.Plugins.CapacitorUpdater.notifyAppReady(); } catch(e) {}
    }
  };
  notifyReady();

  const checkForUpdates = async (isManual = false) => {
    if (!window.Capacitor || !window.Capacitor.isPluginAvailable('CapacitorUpdater')) {
      if (isManual) app.notify('Native environment not detected');
      return;
    }

    const { CapacitorUpdater } = window.Capacitor.Plugins;

    try {
      if (isManual) app.notify('Checking for updates...');
      const version = await CapacitorUpdater.getLatest();

      if (version.url) {
        app.notify('New update found! Downloading...');
        const res = await CapacitorUpdater.download({
          url: version.url,
          version: version.version
        });

        if (confirm('A new update is ready. Reload now to apply?')) {
          await CapacitorUpdater.set(res);
        }
      } else {
        if (isManual) app.notify('System is up to date.');
      }
    } catch (err) {
      console.error('Update failed:', err);
      if (isManual) app.notify('Check failed. Connect to internet.');
    }
  };
  app.checkForUpdates = checkForUpdates;
  const Storage = {
    getSessions: () => JSON.parse(localStorage.getItem('marku_sessions') || '[]'),
    saveSession: (session) => {
      const sessions = Storage.getSessions();
      const idx = sessions.findIndex(s => s.id === session.id);
      if (idx > -1) sessions[idx] = session;
      else sessions.unshift(session);
      localStorage.setItem('marku_sessions', JSON.stringify(sessions.slice(0, 50)));
    },
    deleteSession: (id) => {
      const sessions = Storage.getSessions().filter(s => s.id !== id);
      localStorage.setItem('marku_sessions', JSON.stringify(sessions));
      if (currentView === 'history') app.renderHistoryView();
    },
    getProfiles: () => {
      let ps = JSON.parse(localStorage.getItem('marku_profiles') || '[{"id":"default","name":"Default Profile","content":"","team":[]}]');
      return ps.map(p => ({ ...p, team: p.team || [] }));
    },
    saveProfiles: (profiles) => localStorage.setItem('marku_profiles', JSON.stringify(profiles)),
    getActiveProfileId: () => localStorage.getItem('marku_active_profile') || 'default',
    setActiveProfileId: (id) => localStorage.setItem('marku_active_profile', id),
    getProductCtx: () => {
      const ps = Storage.getProfiles();
      const aid = Storage.getActiveProfileId();
      const p = ps.find(x => x.id === aid);
      return p ? p.content : '';
    },
    saveProductCtx: (ctx) => {
      const profiles = Storage.getProfiles();
      let p = profiles.find(x => x.id === Storage.getActiveProfileId());
      if (p) {
        p.content = ctx;
        if (p.name === 'Default Profile' || p.name.startsWith('Profile ')) {
           const lines = (ctx||'').split('\n').filter(l => l.trim().length > 0);
           if (lines.length > 0) p.name = lines[0].substring(0, 25).replace(/[^a-zA-Z0-9 ]/g, '').trim() + '...';
        }
      }
      Storage.saveProfiles(profiles);
    },
    getStats: () => {
      const sessions = Storage.getSessions();
      const uniqueSkills = new Set(sessions.map(s => s.skillId)).size;
      const totalMessages = sessions.reduce((sum, s) => sum + s.messages.length, 0);
      return { uniqueSkills, totalMessages, sessionsCount: sessions.length };
    }
  };

  // Chat state
  let activeSkill = null;
  let activeSessionId = null;
  let messages = [];
  let isGenerating = false;

  // Simple Markdown to HTML parser
  function parseMd(text) {
    if (!text) return '';
    let html = text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:var(--border);padding:2px 4px;border-radius:4px;color:var(--accent);font-size:0.85em;">$1</code>');
    return html.replace(/\n/g, '<br>');
  }

  // ---- ROUTER ----
  function navigate(view, data) {
    currentView = view;
    $$('.view').forEach(v => v.classList.remove('active'));
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    $$('.sidebar-item').forEach(n => n.classList.remove('active'));

    if (view === 'skill-tool') {
      const el = $('#view-skill-tool');
      if(el) el.classList.add('active');
      setActiveNav('skills');

      if (data && data !== activeSessionId) {
        startChatSession(data);
      } else {
        renderChatView(); // Re-render existing session
      }
    } else {
      const el = $(`#view-${view}`);
      if(el) el.classList.add('active');
      setActiveNav(view);

      if (view === 'skills') renderSkillsHub();
      else if (view === 'dashboard') renderDashboard();
      else if (view === 'content') renderContentView();
      else if (view === 'campaigns') renderCampaignsView();
      else if (view === 'analytics') renderAnalyticsView();
      else if (view === 'history') renderHistoryView();
      else if (view === 'settings') renderSettingsView();
      else if (view === 'support') renderSupportView();
    }
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function setActiveNav(view) {
    $$('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === view);
    });
    $$('.sidebar-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === view);
    });
  }

  app.showModal = function(config) {
    const container = $('#modal-container');
    if (!container) return;

    container.innerHTML = `
      <div class="modal-backdrop" onclick="app.closeModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">${config.title || 'Modal'}</h2>
          <button class="modal-close" onclick="app.closeModal()">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="modal-body">
          ${config.body || ''}
        </div>
        <div class="modal-footer">
          ${config.footer || ''}
        </div>
      </div>
    `;
    container.classList.add('active');
  };

  app.closeModal = function() {
    const container = $('#modal-container');
    if (container) container.classList.remove('active');
  };

  app.newProfile = function() {
    app.showModal({
      title: 'Create Project Team',
      body: `
        <div class="form-group">
          <label class="form-label">Project Name</label>
          <input type="text" id="modal-project-name" class="form-input" placeholder="e.g. Acme Marketing SEO">
        </div>
        <div class="form-group">
          <label class="form-label">Add Team Member (Email)</label>
          <div style="display:flex; gap:8px;">
            <input type="email" id="modal-team-email" class="form-input" placeholder="colleague@example.com">
            <button onclick="app.addTeamMemberToModal()" class="btn btn-primary" style="padding:0 12px;"><span class="material-symbols-outlined">add</span></button>
          </div>
          <div id="modal-team-list" class="team-list"></div>
        </div>
      `,
      footer: `
        <button onclick="app.closeModal()" class="btn btn-ghost">Cancel</button>
        <button onclick="app.saveNewProfileFromModal()" class="btn btn-primary">Create Project</button>
      `
    });
    window.modalTeam = [];
  };

  app.addTeamMemberToModal = function() {
    const emailInput = $('#modal-team-email');
    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) return app.notify('Valid email required');
    if (window.modalTeam.includes(email)) return app.notify('Already added');

    window.modalTeam.push(email);
    emailInput.value = '';
    app.renderModalTeamList();
  };

  app.renderModalTeamList = function() {
    const list = $('#modal-team-list');
    if (!list) return;
    list.innerHTML = window.modalTeam.map((email, idx) => `
      <div class="team-member">
        <span>${email}</span>
        <button onclick="app.removeFromModalTeam(${idx})" class="remove-member">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    `).join('');
  };

  app.removeFromModalTeam = function(idx) {
    window.modalTeam.splice(idx, 1);
    app.renderModalTeamList();
  };

  app.saveNewProfileFromModal = function() {
    const nameInput = $('#modal-project-name');
    const name = nameInput.value.trim();
    if (!name) return app.notify('Project name required');

    const profiles = Storage.getProfiles();
    const newId = 'prof_' + Date.now();
    profiles.push({ id: newId, name, content: '', team: [...window.modalTeam] });
    Storage.saveProfiles(profiles);
    Storage.setActiveProfileId(newId);
    app.closeModal();
    app.notify(`Created Project: ${name}`);
    renderDashboard();
    if (currentView === 'settings') renderSettingsView();
  };

  app.switchProfile = function(id) {
    console.log("Switching profile to:", id);
    if (!id) return;
    Storage.setActiveProfileId(id);
    const profiles = Storage.getProfiles();
    const prof = profiles.find(p => p.id === id);
    if(prof) app.notify(`Switched to: ${prof.name}`);
    renderDashboard();
    if (currentView === 'settings') renderSettingsView();
  };

  app.toggleTheme = function() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('marku_theme', isLight ? 'light' : 'dark');
  };

  // ---- INIT ----
  function renderDashboard() {
    const el = $('#view-dashboard');
    if (!el) return;

    const activeProfileId = Storage.getActiveProfileId();
    const profiles = Storage.getProfiles();

    const profileSwitcherHTML = `
      <div style="background:var(--bg-elevated); padding:18px; border-radius:var(--radius-sm); margin-bottom: 24px; display:flex; gap:16px; align-items:center; border:1px solid var(--border); box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="width:42px; height:42px; border-radius:10px; background:var(--primary-bg); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:24px;">business_center</span>
        </div>
        <div style="flex:1;">
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:6px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">Active Project Workspace</div>
          <select id="profile-select" style="width:100%; background:var(--bg-input); color:var(--text); border:1px solid var(--border); padding:10px 12px; border-radius:10px; font-family:inherit; font-size:0.95rem; font-weight:600; appearance: none; cursor:pointer;" onchange="app.switchProfile(this.value)">
             ${profiles.map(p => `<option value="${p.id}" ${p.id === activeProfileId ? 'selected' : ''}>${p.name}</option>`).join('')}
          </select>
        </div>
        <button onclick="app.newProfile()" class="btn btn-primary" style="padding:12px 18px; border-radius:10px; display:flex; align-items:center; gap:8px;" title="Create New Project Workspace">
          <span class="material-symbols-outlined" style="font-size:20px;">add_circle</span>
          <span style="font-weight:700;">New Project</span>
        </button>
      </div>
    `;

    // Pick first 3 skills as popular
    const popSkills = window.SKILLS.slice(0, 3);
    const sessions = Storage.getSessions();

    el.innerHTML = `
      <h1 class="view-title" style="margin-bottom: 0;">Dashboard</h1>
      <div style="margin-top: -20px; margin-bottom: 20px;">
        ${profileSwitcherHTML}
      </div>
      <div class="mb-16">
        <main class="px-6 mt-8 space-y-10">
<!-- AI Insights Card (Hero) -->
<section>
<div class="relative overflow-hidden rounded-[2rem] bg-secondary-container p-1 shadow-2xl">
<div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
<div class="relative bg-surface-container rounded-[1.9rem] p-8 flex flex-col gap-6">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-tertiary" data-icon="auto_awesome" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<span class="text-xs font-bold uppercase tracking-widest text-tertiary font-plus-jakarta">AI Strategy Insight</span>
</div>
<div class="space-y-3">
<h2 class="text-2xl font-extrabold font-plus-jakarta leading-tight">Your 'Summer Glow' campaign is trending in Tokyo.</h2>
<p class="text-on-surface-variant body-md leading-relaxed">AI suggests increasing ad spend by <span class="text-primary font-bold">15%</span> on Instagram Reels to capture an estimated <span class="text-tertiary font-bold">4.2k</span> new leads this weekend.</p>
</div>
<button class="w-full py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 scale-95 active:scale-90 transition-all">
                        Apply Strategy Now
                    </button>
</div>
</div>
</section>
<!-- Quick Action Hub -->
<section class="space-y-4">
<h3 class="text-on-surface font-plus-jakarta text-title-lg font-bold">Quick Actions</h3>
<div class="grid grid-cols-3 gap-4">
<div class="flex flex-col items-center gap-2 group">
<button class="w-full aspect-square bg-surface-container-high rounded-3xl flex items-center justify-center text-primary group-active:scale-90 transition-transform">
<span class="material-symbols-outlined text-3xl" data-icon="add_circle">add_circle</span>
</button>
<span class="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant font-plus-jakarta">Create Post</span>
</div>
<div class="flex flex-col items-center gap-2 group">
<button class="w-full aspect-square bg-surface-container-high rounded-3xl flex items-center justify-center text-secondary group-active:scale-90 transition-transform">
<span class="material-symbols-outlined text-3xl" data-icon="psychology">psychology</span>
</button>
<span class="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant font-plus-jakarta">New Strategy</span>
</div>
<div class="flex flex-col items-center gap-2 group">
<button class="w-full aspect-square bg-surface-container-high rounded-3xl flex items-center justify-center text-tertiary group-active:scale-90 transition-transform">
<span class="material-symbols-outlined text-3xl" data-icon="query_stats">query_stats</span>
</button>
<span class="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant font-plus-jakarta">Performance</span>
</div>
</div>
</section>
<!-- Campaign Summary Cards (Bento Style) -->
<section class="space-y-6 pb-12">
<div class="flex items-center justify-between">
<h3 class="text-on-surface font-plus-jakarta text-title-lg font-bold">Active Campaigns</h3>
<button class="text-primary font-bold text-sm">View All</button>
</div>
<div class="grid grid-cols-1 gap-6">
<!-- Campaign Card 1 -->
<div class="bg-surface-container-low rounded-[2rem] p-6 space-y-6">
<div class="flex justify-between items-start">
<div class="space-y-1">
<h4 class="text-xl font-bold font-plus-jakarta">Project Nebula</h4>
<p class="text-xs text-on-surface-variant font-medium">B2B SaaS Growth • Q3</p>
</div>
<span class="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">Active</span>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="bg-surface-container p-4 rounded-2xl">
<span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest block mb-1">Reach</span>
<span class="text-xl font-extrabold font-plus-jakarta">12.8k</span>
<div class="flex items-center gap-1 text-tertiary text-[10px] font-bold mt-1">
<span class="material-symbols-outlined text-xs" data-icon="trending_up">trending_up</span>
                                14%
                            </div>
</div>
<div class="bg-surface-container p-4 rounded-2xl">
<span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest block mb-1">Engagement</span>
<span class="text-xl font-extrabold font-plus-jakarta">3.2k</span>
<div class="flex items-center gap-1 text-tertiary text-[10px] font-bold mt-1">
<span class="material-symbols-outlined text-xs" data-icon="trending_up">trending_up</span>
                                8%
                            </div>
</div>
</div>
<div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full w-2/3 bg-gradient-to-r from-primary to-secondary"></div>
</div>
</div>
<!-- Campaign Card 2 -->
<div class="bg-surface-container-low rounded-[2rem] p-6 space-y-6">
<div class="flex justify-between items-start">
<div class="space-y-1">
<h4 class="text-xl font-bold font-plus-jakarta">Aura Launch</h4>
<p class="text-xs text-on-surface-variant font-medium">Lifestyle E-commerce</p>
</div>
<span class="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-widest rounded-full">Optimizing</span>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="bg-surface-container p-4 rounded-2xl">
<span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest block mb-1">Reach</span>
<span class="text-xl font-extrabold font-plus-jakarta">45.1k</span>
<div class="flex items-center gap-1 text-tertiary text-[10px] font-bold mt-1">
<span class="material-symbols-outlined text-xs" data-icon="trending_up">trending_up</span>
                                22%
                            </div>
</div>
<div class="bg-surface-container p-4 rounded-2xl">
<span class="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest block mb-1">CTR</span>
<span class="text-xl font-extrabold font-plus-jakarta">4.8%</span>
<div class="flex items-center gap-1 text-error text-[10px] font-bold mt-1">
<span class="material-symbols-outlined text-xs" data-icon="trending_down">trending_down</span>
                                2%
                            </div>
</div>
</div>
<div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full w-1/2 bg-gradient-to-r from-tertiary to-primary"></div>
</div>
</div>
</div>
</section>
</main>

      </div>

      <div style="display:flex;justify-content:space-between;align-items:center" class="mb-8 mt-12 px-6">
        <h3 class="section-heading" style="margin:0">Recent AI Sessions</h3>
        <button class="btn btn-ghost btn-sm" onclick="app.navigate('history')">View All</button>
      </div>

      <div class="flex-col gap-12 mb-24 px-6">
        ${sessions.length > 0 ? sessions.slice(0, 2).map(s => \`
          <div class="card card-sm" onclick="app.resumeSession('\${s.id}')" style="cursor:pointer">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:20px">\${s.skillEmoji}</span>
              <div style="flex:1">
                <div style="font-weight:700;font-size:0.9rem">\${s.skillName}</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">\${new Date(s.ts).toLocaleDateString()} • \${s.messages.length} messages</div>
              </div>
              <span class="material-symbols-outlined" style="font-size:18px;color:var(--text-muted)">chevron_right</span>
            </div>
          </div>
        \`).join('') : '<p style="font-size:0.8rem;color:var(--text-muted);text-align:center;padding:10px">No recent sessions.</p>'}
      </div>
    ` + footerHTML;
  } Skills App - Main Application Logic
(function(){
  window.app = window.app || {};
  const app = window.app;
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  app.$ = $;
  app.$$ = $$;

  // Current state
  let currentView = 'dashboard';
  let catFilter = 'All';
  let searchQ = '';

  const footerHTML = `
    <div style="padding: 40px 20px 20px; text-align: center; color: var(--text-muted); font-size: 0.75rem; margin-top: 20px;">
      <button onclick="app.navigate('support')" style="background:none; border:none; color:var(--text-dim); text-decoration:none; display:flex; align-items:center; justify-content:center; gap:6px; margin-bottom:8px; font-weight:600; cursor:pointer; width:100%;">
        <span class="material-symbols-outlined" style="font-size:16px;">support_agent</span> Support & Feedback
      </button>
      &copy; 2026 MarkU
    </div>
  `;

  // Capgo Live Updates Integration
  const triggerHaptic = async (style = "LIGHT") => {
    if (window.Capacitor && window.Capacitor.isPluginAvailable("Haptics")) {
      const { Haptics, ImpactStyle } = window.Capacitor.Plugins;
      try { await Haptics.impact({ style: ImpactStyle[style] || ImpactStyle.Light }); } catch(e) {}
    }
  };
  app.triggerHaptic = triggerHaptic;
  const notifyReady = async () => {
    if (window.Capacitor && window.Capacitor.isPluginAvailable("CapacitorUpdater")) {
      try { await window.Capacitor.Plugins.CapacitorUpdater.notifyAppReady(); } catch(e) {}
    }
  };
  notifyReady();

  const checkForUpdates = async (isManual = false) => {
    if (!window.Capacitor || !window.Capacitor.isPluginAvailable('CapacitorUpdater')) {
      if (isManual) app.notify('Native environment not detected');
      return;
    }
    
    const { CapacitorUpdater } = window.Capacitor.Plugins;
    
    try {
      if (isManual) app.notify('Checking for updates...');
      const version = await CapacitorUpdater.getLatest();
      
      if (version.url) {
        app.notify('New update found! Downloading...');
        const res = await CapacitorUpdater.download({
          url: version.url,
          version: version.version
        });
        
        if (confirm('A new update is ready. Reload now to apply?')) {
          await CapacitorUpdater.set(res);
        }
      } else {
        if (isManual) app.notify('System is up to date.');
      }
    } catch (err) {
      console.error('Update failed:', err);
      if (isManual) app.notify('Check failed. Connect to internet.');
    }
  };
  app.checkForUpdates = checkForUpdates;
  const Storage = {
    getSessions: () => JSON.parse(localStorage.getItem('marku_sessions') || '[]'),
    saveSession: (session) => {
      const sessions = Storage.getSessions();
      const idx = sessions.findIndex(s => s.id === session.id);
      if (idx > -1) sessions[idx] = session;
      else sessions.unshift(session);
      localStorage.setItem('marku_sessions', JSON.stringify(sessions.slice(0, 50)));
    },
    deleteSession: (id) => {
      const sessions = Storage.getSessions().filter(s => s.id !== id);
      localStorage.setItem('marku_sessions', JSON.stringify(sessions));
      if (currentView === 'history') app.renderHistoryView();
    },
    getProfiles: () => {
      let ps = JSON.parse(localStorage.getItem('marku_profiles') || '[{"id":"default","name":"Default Profile","content":"","team":[]}]');
      return ps.map(p => ({ ...p, team: p.team || [] }));
    },
    saveProfiles: (profiles) => localStorage.setItem('marku_profiles', JSON.stringify(profiles)),
    getActiveProfileId: () => localStorage.getItem('marku_active_profile') || 'default',
    setActiveProfileId: (id) => localStorage.setItem('marku_active_profile', id),
    getProductCtx: () => {
      const ps = Storage.getProfiles();
      const aid = Storage.getActiveProfileId();
      const p = ps.find(x => x.id === aid);
      return p ? p.content : '';
    },
    saveProductCtx: (ctx) => {
      const profiles = Storage.getProfiles();
      let p = profiles.find(x => x.id === Storage.getActiveProfileId());
      if (p) {
        p.content = ctx;
        if (p.name === 'Default Profile' || p.name.startsWith('Profile ')) {
           const lines = (ctx||'').split('\n').filter(l => l.trim().length > 0);
           if (lines.length > 0) p.name = lines[0].substring(0, 25).replace(/[^a-zA-Z0-9 ]/g, '').trim() + '...';
        }
      }
      Storage.saveProfiles(profiles);
    },
    getStats: () => {
      const sessions = Storage.getSessions();
      const uniqueSkills = new Set(sessions.map(s => s.skillId)).size;
      const totalMessages = sessions.reduce((sum, s) => sum + s.messages.length, 0);
      return { uniqueSkills, totalMessages, sessionsCount: sessions.length };
    }
  };

  // Chat state
  let activeSkill = null;
  let activeSessionId = null;
  let messages = [];
  let isGenerating = false;

  // Simple Markdown to HTML parser
  function parseMd(text) {
    if (!text) return '';
    let html = text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code style="background:var(--border);padding:2px 4px;border-radius:4px;color:var(--accent);font-size:0.85em;">$1</code>');
    return html.replace(/\n/g, '<br>');
  }

  // ---- ROUTER ----
  function navigate(view, data) {
    currentView = view;
    $$('.view').forEach(v => v.classList.remove('active'));
    $$('.nav-item').forEach(n => n.classList.remove('active'));
    $$('.sidebar-item').forEach(n => n.classList.remove('active'));

    if (view === 'skill-tool') {
      const el = $('#view-skill-tool');
      if(el) el.classList.add('active');
      setActiveNav('skills');
      
      if (data && data !== activeSessionId) {
        startChatSession(data);
      } else {
        renderChatView(); // Re-render existing session
      }
    } else {
      const el = $(`#view-${view}`);
      if(el) el.classList.add('active');
      setActiveNav(view);
      
      if (view === 'skills') renderSkillsHub();
      else if (view === 'dashboard') renderDashboard();
      else if (view === 'content') renderContentView();
      else if (view === 'campaigns') renderCampaignsView();
      else if (view === 'analytics') renderAnalyticsView();
      else if (view === 'history') renderHistoryView();
      else if (view === 'settings') renderSettingsView();
      else if (view === 'support') renderSupportView();
    }
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function setActiveNav(view) {
    $$('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === view);
    });
    $$('.sidebar-item').forEach(n => {
      n.classList.toggle('active', n.dataset.view === view);
    });
  }

  app.showModal = function(config) {
    const container = $('#modal-container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="modal-backdrop" onclick="app.closeModal()"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">${config.title || 'Modal'}</h2>
          <button class="modal-close" onclick="app.closeModal()">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
        <div class="modal-body">
          ${config.body || ''}
        </div>
        <div class="modal-footer">
          ${config.footer || ''}
        </div>
      </div>
    `;
    container.classList.add('active');
  };

  app.closeModal = function() {
    const container = $('#modal-container');
    if (container) container.classList.remove('active');
  };

  app.newProfile = function() {
    app.showModal({
      title: 'Create Project Team',
      body: `
        <div class="form-group">
          <label class="form-label">Project Name</label>
          <input type="text" id="modal-project-name" class="form-input" placeholder="e.g. Acme Marketing SEO">
        </div>
        <div class="form-group">
          <label class="form-label">Add Team Member (Email)</label>
          <div style="display:flex; gap:8px;">
            <input type="email" id="modal-team-email" class="form-input" placeholder="colleague@example.com">
            <button onclick="app.addTeamMemberToModal()" class="btn btn-primary" style="padding:0 12px;"><span class="material-symbols-outlined">add</span></button>
          </div>
          <div id="modal-team-list" class="team-list"></div>
        </div>
      `,
      footer: `
        <button onclick="app.closeModal()" class="btn btn-ghost">Cancel</button>
        <button onclick="app.saveNewProfileFromModal()" class="btn btn-primary">Create Project</button>
      `
    });
    window.modalTeam = [];
  };

  app.addTeamMemberToModal = function() {
    const emailInput = $('#modal-team-email');
    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) return app.notify('Valid email required');
    if (window.modalTeam.includes(email)) return app.notify('Already added');
    
    window.modalTeam.push(email);
    emailInput.value = '';
    app.renderModalTeamList();
  };

  app.renderModalTeamList = function() {
    const list = $('#modal-team-list');
    if (!list) return;
    list.innerHTML = window.modalTeam.map((email, idx) => `
      <div class="team-member">
        <span>${email}</span>
        <button onclick="app.removeFromModalTeam(${idx})" class="remove-member">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
    `).join('');
  };

  app.removeFromModalTeam = function(idx) {
    window.modalTeam.splice(idx, 1);
    app.renderModalTeamList();
  };

  app.saveNewProfileFromModal = function() {
    const nameInput = $('#modal-project-name');
    const name = nameInput.value.trim();
    if (!name) return app.notify('Project name required');
    
    const profiles = Storage.getProfiles();
    const newId = 'prof_' + Date.now();
    profiles.push({ id: newId, name, content: '', team: [...window.modalTeam] });
    Storage.saveProfiles(profiles);
    Storage.setActiveProfileId(newId);
    app.closeModal();
    app.notify(`Created Project: ${name}`);
    renderDashboard();
    if (currentView === 'settings') renderSettingsView();
  };

  app.switchProfile = function(id) {
    console.log("Switching profile to:", id);
    if (!id) return;
    Storage.setActiveProfileId(id);
    const profiles = Storage.getProfiles();
    const prof = profiles.find(p => p.id === id);
    if(prof) app.notify(`Switched to: ${prof.name}`);
    renderDashboard();
    if (currentView === 'settings') renderSettingsView();
  };

  app.toggleTheme = function() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('marku_theme', isLight ? 'light' : 'dark');
  };

  // ---- INIT ----
  function renderDashboard() {
    const el = $('#view-dashboard');
    if (!el) return;

    const activeProfileId = Storage.getActiveProfileId();
    const profiles = Storage.getProfiles();

    const profileSwitcherHTML = `
      <div style="background:var(--bg-elevated); padding:18px; border-radius:var(--radius-sm); margin-bottom: 24px; display:flex; gap:16px; align-items:center; border:1px solid var(--border); box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="width:42px; height:42px; border-radius:10px; background:var(--primary-bg); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <span class="material-symbols-outlined" style="color:var(--primary); font-size:24px;">business_center</span>
        </div>
        <div style="flex:1;">
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:6px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;">Active Project Workspace</div>
          <select id="profile-select" style="width:100%; background:var(--bg-input); color:var(--text); border:1px solid var(--border); padding:10px 12px; border-radius:10px; font-family:inherit; font-size:0.95rem; font-weight:600; appearance: none; cursor:pointer;" onchange="app.switchProfile(this.value)">
             ${profiles.map(p => `<option value="${p.id}" ${p.id === activeProfileId ? 'selected' : ''}>${p.name}</option>`).join('')}
          </select>
        </div>
        <button onclick="app.newProfile()" class="btn btn-primary" style="padding:12px 18px; border-radius:10px; display:flex; align-items:center; gap:8px;" title="Create New Project Workspace">
          <span class="material-symbols-outlined" style="font-size:20px;">add_circle</span>
          <span style="font-weight:700;">New Project</span>
        </button>
      </div>
    `;
    
    // Pick first 3 skills as popular
    const popSkills = window.SKILLS.slice(0, 3);
    const sessions = Storage.getSessions();

    el.innerHTML = `
      <h1 class="view-title">Dashboard</h1>
      ${profileSwitcherHTML}
      <div class="hero-card mb-16">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <span class="material-symbols-outlined" style="color:var(--accent);font-variation-settings:'FILL' 1">auto_awesome</span>
          <span class="section-title" style="margin:0;color:var(--accent)">AI Strategy Insight</span>
        </div>
        <h2 style="font-size:1.3rem;font-weight:800;line-height:1.3;margin-bottom:8px">Welcome back, Marketer.</h2>
        <p style="color:var(--text-dim);font-size:0.85rem;line-height:1.5;margin-bottom:16px">You have ${sessions.length} active consultations. Need a new campaign idea for Q2?</p>
        <button class="btn btn-primary btn-full" onclick="app.navigate('skills')">Launch New Skill</button>
      </div>

      <div class="section-title">Quick Actions</div>
      <div class="grid-3 mb-16">
        <button class="card card-sm" style="text-align:center;cursor:pointer" onclick="app.navigate('skills')">
          <span class="material-symbols-outlined" style="font-size:28px;color:var(--primary);display:block;margin-bottom:6px">auto_awesome</span>
          <span style="font-size:0.7rem;font-weight:700;color:var(--text-dim)">Skills Hub</span>
        </button>
        <button class="card card-sm" style="text-align:center;cursor:pointer" onclick="app.navigate('content')">
          <span class="material-symbols-outlined" style="font-size:28px;color:var(--secondary);display:block;margin-bottom:6px">edit_note</span>
          <span style="font-size:0.7rem;font-weight:700;color:var(--text-dim)">Create Post</span>
        </button>
        <button class="card card-sm" style="text-align:center;cursor:pointer" onclick="app.navigate('history')">
          <span class="material-symbols-outlined" style="font-size:28px;color:var(--accent);display:block;margin-bottom:6px">history</span>
          <span style="font-size:0.7rem;font-weight:700;color:var(--text-dim)">History</span>
        </button>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center" class="mb-8">
        <h3 class="section-heading" style="margin:0">Recent AI Sessions</h3>
        <button class="btn btn-ghost btn-sm" onclick="app.navigate('history')">View All</button>
      </div>
      
      <div class="flex-col gap-12 mb-24">
        ${sessions.length > 0 ? sessions.slice(0, 2).map(s => `
          <div class="card card-sm" onclick="app.resumeSession('${s.id}')" style="cursor:pointer">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:20px">${s.skillEmoji}</span>
              <div style="flex:1">
                <div style="font-weight:700;font-size:0.9rem">${s.skillName}</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">${new Date(s.ts).toLocaleDateString()} • ${s.messages.length} messages</div>
              </div>
              <span class="material-symbols-outlined" style="font-size:18px;color:var(--text-muted)">chevron_right</span>
            </div>
          </div>
        `).join('') : '<p style="font-size:0.8rem;color:var(--text-muted);text-align:center;padding:10px">No recent sessions.</p>'}
      </div>

      <div class="mt-24">
        <div class="section-title">Popular Skills</div>
        <div class="flex-col">
          ${popSkills.map(s => renderQuickSkill(s.id, s.name, s.tagline, s.emoji, window.CATS[s.cat]?.color || '#f472b6')).join('')}
        </div>
      </div>
      ${footerHTML}
    `;
  }

  function renderQuickSkill(id,name,desc,emoji,color) {
    return `<div class="skill-list-item" onclick="app.openSkill('${id}')">
      <div class="skill-icon" style="background:${color}15;color:${color};display:flex;align-items:center;justify-content:center;font-size:20px;">${emoji}</div>
      <div><h5>${name}</h5><p style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">${desc}</p></div>
    </div>`;
  }

  // ---- SKILLS HUB VIEW WITH SEARCH ----
  function renderSkillsHub() {
    const el = $('#view-skills');
    if (!el) return;
    
    const cats = ['All', ...Object.keys(window.CATS)];
    
    const filtered = window.SKILLS.filter(s => {
      const matchCat = catFilter === 'All' || s.cat === catFilter;
      const q = searchQ.toLowerCase();
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    el.innerHTML = `
      <h2 class="section-heading" style="font-size:1.4rem">Skills Hub</h2>
      <p style="color:var(--text-dim);font-size:0.85rem;margin-bottom:20px">${window.SKILLS.length} marketing skills at your fingertips.</p>
      
      <!-- Search Box -->
      <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:8px;margin-bottom:16px;">
        <span class="material-symbols-outlined" style="color:var(--text-muted);font-size:18px">search</span>
        <input type="text" id="skills-search" placeholder="Search skills..." value="${searchQ}" 
               style="flex:1;background:transparent;border:none;color:var(--text);font-size:0.95rem;outline:none;" 
               onkeyup="app.handleSearch(event)">
        ${searchQ ? `<button onclick="app.clearSearch()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:18px;">&times;</button>` : ''}
      </div>

      <!-- Categories Scroll -->
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:12px;margin-bottom:8px;scrollbar-width:none;-webkit-overflow-scrolling:touch;">
        ${cats.map(c => {
          const catInfo = window.CATS[c];
          const isActive = catFilter === c;
          const bg = isActive ? 'var(--text)' : 'var(--card-bg)';
          const color = isActive ? 'var(--bg)' : 'var(--text-dim)';
          const border = isActive ? 'transparent' : 'var(--border)';
          return `<button onclick="app.setCategoryFilter('${c}')" 
            style="background:${bg};color:${color};border:1px solid ${border};border-radius:20px;padding:6px 14px;font-size:0.8rem;white-space:nowrap;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;">
            ${c !== 'All' ? catInfo.icon + ' ' : ''}${c}
          </button>`;
        }).join('')}
      </div>

      <div class="grid-2 gap-16">
        ${filtered.length > 0 ? filtered.map(s => {
          const c = window.CATS[s.cat];
          return `
            <div class="card" onclick="app.openSkill('${s.id}')" style="cursor:pointer;display:flex;flex-direction:column;gap:8px;transition:0.2s;">
              <div style="display:flex;justify-content:space-between;align-items:start;">
                <div style="width:36px;height:36px;border-radius:10px;background:${c.bg || '#333'};display:flex;align-items:center;justify-content:center;font-size:18px;">
                  ${s.emoji}
                </div>
                <span style="font-size:0.65rem;font-weight:700;border-radius:4px;padding:2px 6px;color:${c.color};background:${c.bg || '#333'}">
                  ${s.cat}
                </span>
              </div>
              <h4 style="font-size:0.95rem;margin-top:4px;">${s.name}</h4>
              <p style="font-size:0.75rem;color:var(--text-muted);line-height:1.4">${s.tagline}</p>
              <div style="margin-top:auto;font-size:0.75rem;color:${c.color};font-weight:700;">Start &rarr;</div>
            </div>
          `;
        }).join('') : `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:40px 0;">No skills found.</p>`}
      </div>
    `;
  }

  window.app = window.app || {};
  app.handleSearch = function(e) {
    searchQ = e.target.value;
    renderSkillsHub();
    // Keep focus
    setTimeout(() => {
      const input = document.getElementById('skills-search');
      if (input) {
        input.focus();
        // Move cursor to end
        input.selectionStart = input.selectionEnd = input.value.length;
      }
    }, 0);
  };
  app.clearSearch = function() {
    searchQ = '';
    renderSkillsHub();
  };
  app.setCategoryFilter = function(cat) {
    catFilter = cat;
    renderSkillsHub();
  };

  // ---- CHAT / SKILL INTERFACE ----
  function startChatSession(skillId) {
    activeSkill = window.SKILLS.find(s => s.id === skillId);
    if (!activeSkill) return;

    activeSessionId = `${skillId}-${Date.now()}`;
    const productCtx = Storage.getProductCtx();
    const ctxNote = (productCtx && skillId !== 'product-context') 
      ? `\n\n*I see your product context is saved! I'll use it so you don't have to repeat yourself.*`
      : "";

    // Use proper opener message
    const openMsg = {
      role: 'assistant',
      content: `**${activeSkill.name}** — ${activeSkill.tagline}${ctxNote}\n\n${window.getSkillOpener(activeSkill.id)}`
    };
    messages = [openMsg];
    renderChatView();
  }

  function resumeSession(sessionId) {
    const session = Storage.getSessions().find(s => s.id === sessionId);
    if (!session) return;
    
    activeSkill = window.SKILLS.find(s => s.id === session.skillId);
    activeSessionId = session.id;
    messages = session.messages;
    
    navigate('skill-tool', session.skillId);
    renderChatView();
  }

  function renderChatView() {
    const el = $('#view-skill-tool');
    if (!el || !activeSkill) return;
    
    const catInfo = window.CATS[activeSkill.cat];
    const accentColor = catInfo?.color || 'var(--accent)';

    el.innerHTML = `
      <div class="skill-header" style="position:sticky;top:60px;background:var(--bg);z-index:10;padding-bottom:10px;border-bottom:1px solid ${accentColor}44;margin-bottom:16px;">
        <button class="back-btn" onclick="app.navigate('history')"><span class="material-symbols-outlined">history</span></button>
        <div style="flex:1;text-align:center;">
          <h2 style="font-size:1rem;font-weight:800;display:flex;align-items:center;justify-content:center;gap:6px;">
            <span style="font-size:1.2rem">${activeSkill.emoji}</span> ${activeSkill.name}
          </h2>
          <p style="font-size:0.7rem;color:${accentColor};margin-top:2px;">${catInfo.icon} ${activeSkill.cat}</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="icon-btn" onclick="app.exportPDF()" title="Export Customized PDF" aria-label="Export Customized PDF"><span class="material-symbols-outlined" aria-hidden="true">picture_as_pdf</span></button>
          <button class="icon-btn" onclick="app.openSkill('${activeSkill.id}')" title="New Session" style="color:var(--text-dim)" aria-label="New Session"><span class="material-symbols-outlined" aria-hidden="true">restart_alt</span></button>
          <button class="icon-btn" onclick="app.triggerSetupApiKey()" title="Setup API Key" style="color:var(--text-dim)" aria-label="Setup API Key"><span class="material-symbols-outlined" aria-hidden="true">key</span></button>
        </div>
      </div>

      <div id="chat-messages" style="display:flex;flex-direction:column;gap:16px;padding-bottom:200px;min-height:60vh;">
        ${messages.map(m => `
          <div style="display:flex;justify-content:${m.role==='user'?'flex-end':'flex-start'};width:100%;">
            ${m.role === 'assistant' ? `
              <div style="display:flex;gap:10px;max-width:90%;">
                <div style="width:28px;height:28px;border-radius:8px;background:${catInfo.bg||'#333'};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:14px;">${activeSkill.emoji}</div>
                <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:4px 12px 12px 12px;padding:12px;font-size:0.9rem;line-height:1.6;color:var(--text);">
                  ${parseMd(m.content)}
                </div>
              </div>
            ` : `
              <div style="background:${accentColor};color:#fff;border-radius:12px 12px 4px 12px;padding:10px 14px;font-size:0.9rem;line-height:1.5;max-width:85%;">
                ${parseMd(m.content)}
              </div>
            `}
          </div>
        `).join('')}
        
        ${isGenerating ? `
          <div style="display:flex;justify-content:flex-start;width:100%;">
            <div style="display:flex;gap:10px;max-width:90%;">
              <div style="width:28px;height:28px;border-radius:8px;background:${catInfo.bg||'#333'};display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;font-size:14px;">${activeSkill.emoji}</div>
              <div style="background:var(--card-bg);border:1px solid var(--border);border-radius:4px 12px 12px 12px;padding:12px;display:flex;gap:4px;align-items:center;">
                <span class="animate-pulse" style="width:6px;height:6px;background:${accentColor};border-radius:50%;display:inline-block;"></span>
                <span class="animate-pulse" style="width:6px;height:6px;background:${accentColor};border-radius:50%;display:inline-block;animation-delay:0.2s"></span>
                <span class="animate-pulse" style="width:6px;height:6px;background:${accentColor};border-radius:50%;display:inline-block;animation-delay:0.4s"></span>
              </div>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Chat Input Area (Adjusted for bottom nav on mobile) -->
      <div class="chat-input-wrapper">
        <form onsubmit="app.sendChatMessage(event)" style="position:relative;max-width:600px;margin:0 auto;display:flex;gap:8px;align-items:flex-end;">
          <input type="file" id="local-file-upload" style="display:none" onchange="app.handleFileUpload(event)" accept="image/*,.txt,.md,.csv,.json">
          <button type="button" onclick="document.getElementById('local-file-upload').click()" style="width:44px;height:44px;border-radius:12px;border:1px solid var(--border);background:var(--card-bg);color:var(--text-muted);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:0.2s;flex-shrink:0;" title="Attach Local File">
            <span class="material-symbols-outlined" style="font-size:22px;transform:rotate(45deg);">attach_file</span>
          </button>
          <textarea id="chat-input" placeholder="Type your answer... (Press Enter to send)" 
                    style="flex:1;background:var(--card-bg);border:1px solid var(--border);border-radius:12px;padding:12px 45px 12px 14px;color:var(--text);font-family:inherit;font-size:0.95rem;resize:none;max-height:120px;min-height:44px;"
                    oninput="this.style.height='';this.style.height=Math.min(this.scrollHeight, 120)+'px';"
                    onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();app.sendChatMessage(event);}"></textarea>
          <button type="submit" disabled style="position:absolute;right:8px;bottom:6px;width:32px;height:32px;border-radius:8px;border:none;background:${accentColor};color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0.5;transition:0.2s;" id="chat-send-btn">
            <span class="material-symbols-outlined" style="font-size:18px;">arrow_upward</span>
          </button>
        </form>
      </div>
    `;

    // Handle button state based on input
    setTimeout(() => {
      const input = $('#chat-input');
      const btn = $('#chat-send-btn');
      if (input && btn) {
        input.focus();
        input.addEventListener('input', () => {
          btn.disabled = input.value.trim().length === 0 || isGenerating;
          btn.style.opacity = btn.disabled ? '0.5' : '1';
        });
      }
      window.scrollTo(0, document.body.scrollHeight);
    }, 50);
  }

  app.triggerSetupApiKey = function() {
    const key = prompt("Enter your Anthropic API Key (sk-ant-...):", localStorage.getItem('anthropic_key') || '');
    if (key !== null) {
      localStorage.setItem('anthropic_key', key.trim());
      alert(key.trim() ? "API key saved locally!" : "API key cleared.");
    }
  };

  app.handleFileUpload = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    app.notify("Reading local file...");
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const content = event.target.result;
      const fileType = file.type.startsWith('image/') ? 'Image' : 'Document';
      let messageContent = `[Attached Local ${fileType}: ${file.name}]\n`;
      
      if (fileType === 'Document') {
        messageContent += `\n\`\`\`\n${content.slice(0, 2000)}${content.length > 2000 ? '\n...[truncated]' : ''}\n\`\`\``;
      } else {
        messageContent += `\n*(Image data loaded locally via FileReader)*`;
      }

      messages.push({ role: 'user', content: messageContent });
      app.notify("Attachment added to context.");
      renderChatView();
    };

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  app.sendChatMessage = async function(e) {
    if (e) e.preventDefault();
    const inputEl = $('#chat-input');
    const text = inputEl.value.trim();
    if (!text || isGenerating) return;

    // Add user message
    messages.push({ role: 'user', content: text });
    inputEl.value = '';
    inputEl.style.height = '44px';
    isGenerating = true;
    renderChatView();

    const apiKey = localStorage.getItem('anthropic_key');

    if (!apiKey) {
      // Mock Response if no API key
      setTimeout(() => {
        messages.push({ 
          role: 'assistant', 
          content: 'I see you haven\'t configured an Anthropic API Key.\n\nTo get real responses based on the algorithms from the repo, please tap the key icon at the top right to save your API Key, then try again.\n\n*(This is a mock response because no key was found).*'
        });
        isGenerating = false;
        renderChatView();
      }, 1000);
      return;
    }

    try {
      // Build API messages payload
      const apiMessages = messages.slice(1).map(m => ({
        role: m.role,
        content: m.content
      }));

      // Build system prompt with optional product context injection
      let systemPrompt = activeSkill.system;
      const productCtx = Storage.getProductCtx();
      if (productCtx && activeSkill.id !== 'product-context') {
        systemPrompt = `PRODUCT CONTEXT (use this — don't ask about it):\n${productCtx}\n\n---\n\n${systemPrompt}`;
      }

      // Call Anthropic API directly
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 1000,
          system: systemPrompt,
          messages: apiMessages,
        }),
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || 'API Error');
      
      const reply = data.content?.[0]?.text || "No response received.";
      messages.push({ role: "assistant", content: reply });

      // Save session
      Storage.saveSession({
        id: activeSessionId,
        skillId: activeSkill.id,
        skillName: activeSkill.name,
        skillEmoji: activeSkill.emoji,
        skillCat: activeSkill.cat,
        messages: messages,
        ts: Date.now()
      });

      if (activeSkill.id === 'product-context' && messages.length > 4) {
        Storage.saveProductCtx(messages.map(m => `${m.role}: ${m.content}`).join("\n\n").slice(0, 3000));
        app.notify("Product context synced!");
      }

    } catch (err) {
      messages.push({ role: "assistant", content: `⚠️ **Error:** ${err.message}\n\nPlease verify your API key and connection.` });
    } finally {
      isGenerating = false;
      renderChatView();
    }
  };

  // ---- SIMPLE VIEWS ----
  function renderContentView() {
    const el = $('#view-content');
    if (!el) return;
    el.innerHTML = `
      <h2 class="section-heading" style="font-size:1.4rem">Content</h2>
      <p style="color:var(--text-dim);font-size:0.85rem;margin-bottom:20px">Create and manage marketing content.</p>
      <div class="grid-2 gap-16 mb-16">
        ${renderQuickSkill('copywriting','Copywriting','Write copy that actually converts','✏️','#6B4FA0')}
        ${renderQuickSkill('social-content','Social Content','Posts that stop the scroll','📱','#C2421A')}
      </div>
      <div class="flex-col">
        ${renderQuickSkill('email-sequence','Email Sequence','Automated flows that nurture','📧','#1A7AC2')}
        ${renderQuickSkill('cold-email','Cold Email','Outreach that gets replies','✉️','#1A7AC2')}
      </div>
    `;
  }

  function renderCampaignsView() {
    const el = $('#view-campaigns');
    if (!el) return;
    el.innerHTML = `
      <h2 class="section-heading" style="font-size:1.4rem">Campaigns</h2>
      <p style="color:var(--text-dim);font-size:0.85rem;margin-bottom:20px">Manage ad campaigns and creative assets.</p>
      <div class="flex-col gap-16 mb-16">
        ${renderQuickSkill('paid-ads','Paid Ads Strategy','Campaigns that acquire customers profitably','💰','#B87A1A')}
        ${renderQuickSkill('ad-creative','Ad Creative','Ad copy that gets clicks','🎨','#B87A1A')}
        ${renderQuickSkill('ab-test','A/B Test Setup','Design experiments that produce real answers','⚗️','#C25B1A')}
      </div>
    `;
  }

  function renderAnalyticsView() {
    const el = $('#view-analytics');
    if (!el) return;
    const stats = Storage.getStats();
    el.innerHTML = `
      <h2 class="section-heading" style="font-size:1.4rem">Analytics</h2>
      <p style="color:var(--text-dim);font-size:0.85rem;margin-bottom:20px">Track performance across all channels.</p>
      <div class="grid-2 gap-16 mb-16">
        <div class="stat-card"><span class="stat-label">AI Sessions</span><span class="stat-val">${stats.sessionsCount}</span><span class="stat-trend trend-up"><span class="material-symbols-outlined" style="font-size:12px">trending_up</span>Live</span></div>
        <div class="stat-card"><span class="stat-label">Skills Used</span><span class="stat-val">${stats.uniqueSkills}</span><span class="stat-trend trend-up"><span class="material-symbols-outlined" style="font-size:12px">trending_up</span>Active</span></div>
      </div>
      <div class="flex-col">
        ${renderQuickSkill('analytics','Analytics Setup','Measure what matters, ignore what doesn\'t','📊','#1A8C5E')}
        ${renderQuickSkill('revops','Revenue Operations','Fix leaks between marketing and sales','🔧','#1A7A4F')}
      </div>
      ${footerHTML}
    `;
  }

  function renderHistoryView() {
    const el = $('#view-history');
    if (!el) return;
    const sessions = Storage.getSessions();
    const productCtx = Storage.getProductCtx();

    el.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px">
        <div>
          <h2 class="section-heading" style="font-size:1.4rem; margin-bottom:4px;">History</h2>
          <p style="color:var(--text-dim);font-size:0.85rem;margin:0">Your past AI marketing consultations.</p>
        </div>
        <button onclick="app.exportData()" class="btn btn-primary btn-sm" style="display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--border);color:var(--text);border-color:transparent;">
          <span class="material-symbols-outlined" style="font-size:16px">download</span> <span style="font-size:0.85rem">Backup</span>
        </button>
      </div>
      
      ${productCtx ? `
        <div class="card mb-24" style="background:var(--green-bg);border-color:var(--green)">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span class="material-symbols-outlined" style="color:var(--green)">check_circle</span>
            <span style="font-weight:700;color:var(--green)">Product Context Active</span>
          </div>
          <p style="font-size:0.8rem;color:var(--text-dim);line-height:1.4">Every new skill session will use your saved context automatically.</p>
          <button class="btn btn-ghost btn-sm mt-8" onclick="app.openSkill('product-context')" style="padding-left:0;color:var(--green)">Update Context &rarr;</button>
        </div>
      ` : `
        <div class="card mb-24" style="background:var(--card-bg);border-style:dashed">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span class="material-symbols-outlined" style="color:var(--accent)">info</span>
            <span style="font-weight:700;color:var(--text)">Missing Product Context</span>
          </div>
          <p style="font-size:0.8rem;color:var(--text-dim);line-height:1.4">Build your product context to avoid repeating details to the AI.</p>
          <button class="btn btn-primary btn-sm mt-8" onclick="app.openSkill('product-context')">Setup Context</button>
        </div>
      `}

      <div class="flex-col gap-12">
        ${sessions.length > 0 ? sessions.map(s => `
          <div class="card" style="position:relative">
            <div onclick="app.resumeSession('${s.id}')" style="cursor:pointer">
              <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="width:32px;height:32px;border-radius:8px;background:var(--border);display:flex;align-items:center;justify-content:center;font-size:18px">${s.skillEmoji}</div>
                  <div>
                    <h4 style="font-size:1rem;margin:0">${s.skillName}</h4>
                    <span style="font-size:0.7rem;color:var(--text-muted)">${new Date(s.ts).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <p style="font-size:0.8rem;color:var(--text-dim);margin-bottom:8px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">
                ${s.messages[s.messages.length - 1].content.replace(/<[^>]*>/g, '').slice(0, 120)}...
              </p>
            </div>
            <button onclick="app.deleteSession('${s.id}')" style="position:absolute;top:10px;right:10px;background:none;border:none;color:var(--red);cursor:pointer;" title="Delete">
              <span class="material-symbols-outlined" style="font-size:18px">delete</span>
            </button>
          </div>
        `).join('') : '<div style="text-align:center;padding:40px;color:var(--text-muted)">No history yet. Start a skill in the Skills Hub!</div>'}
      </div>
      ${footerHTML}
    `;
  }

  // ---- INIT ----
  function init() {
    // Check if SKILLS exists, otherwise app fails
    if (!window.SKILLS) {
      console.error("SKILLS data missing.");
      return;
    }

    const hash = window.location.hash.slice(1) || 'dashboard';
    navigate(hash);

    // Initialize Theme
    if (localStorage.getItem('marku_theme') === 'light') {
      document.body.classList.add('light-theme');
    }

    window.addEventListener('hashchange', () => {
      const h = window.location.hash.slice(1) || 'dashboard';
      if (!h.startsWith('skill-tool')) {
        navigate(h);
      }
    });
  }

  window.app.exportPDF = () => {
    app.notify('Preparing custom document...');
    const profiles = Storage.getProfiles();
    const activeProfile = profiles.find(p => p.id === Storage.getActiveProfileId());
    const projectName = activeProfile ? activeProfile.name : "MarkU Report";
    
    let header = document.getElementById('print-header');
    if (!header) {
      header = document.createElement('div');
      header.id = 'print-header';
      header.className = 'print-only';
      document.body.prepend(header);
    }
    
    header.innerHTML = `
      <div style="border-bottom:2px solid #000; padding-bottom:10px; margin-bottom:20px; text-align:left;">
        <h1 style="margin:0; font-size:28px; font-weight:800;">MarkU AI Report</h1>
        <div style="display:flex; justify-content:space-between; margin-top:10px; font-size:14px; color:#444; font-weight:600;">
          <span>Project Team: <strong>${projectName}</strong></span>
          <span>Date: ${new Date().toLocaleDateString()}</span>
        </div>
      </div>
    `;
    
    setTimeout(() => {
      window.print();
    }, 150);
  };

  window.app.navigate = navigate;
  window.app.openSkill = (id) => { window.location.hash = 'skill-tool'; navigate('skill-tool', id); };
  window.app.resumeSession = resumeSession;
  window.app.deleteSession = (id) => { if(confirm('Delete this session?')){ Storage.deleteSession(id); } };
  window.app.notify = (msg) => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  window.app.focusSearch = () => {
    app.navigate('skills');
    setTimeout(() => {
      const input = document.querySelector('#skills-search');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };
  
  function renderSettingsView() {
    const el = $('#view-settings');
    if (!el) return;
    
    const activeProfileId = Storage.getActiveProfileId();
    const profiles = Storage.getProfiles();
    const activeProfile = profiles.find(p => p.id === activeProfileId) || {};
    const team = activeProfile.team || [];

    el.innerHTML = `
      <h1 class="view-title">Settings & Resources</h1>
      
      <!-- Profile Management -->
      <div class="card mb-24" style="background:var(--bg-elevated); border:1px solid var(--border);">
        <h3 class="section-heading" style="margin-top:0; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-outlined" style="color:var(--primary);">business_center</span> Project Teams
        </h3>
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">Manage your active projects and teams. Product context is saved per project.</p>
        
        <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:20px;">
          <div style="flex:1; min-width:200px;">
            <select id="settings-profile-select" style="width:100%; background:var(--bg-input); color:var(--text); border:1px solid var(--border); padding:10px 14px; border-radius:8px; font-family:inherit; font-size:0.95rem;" onchange="app.switchProfile(this.value)">
               ${profiles.map(p => `<option value="${p.id}" ${p.id === activeProfileId ? 'selected' : ''}>${p.name}</option>`).join('')}
            </select>
          </div>
          <button onclick="app.newProfile()" class="btn btn-primary" style="padding:10px 20px;">+ New Project</button>
        </div>

        <div class="team-section" style="border-top:1px solid var(--border); padding-top:20px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <h4 style="font-size:0.9rem; font-weight:700;">Active Team Members</h4>
            <button onclick="app.editCurrentProject()" class="btn btn-ghost btn-sm" style="font-size:0.7rem;">Manage Team</button>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${team.length > 0 ? team.map(email => `
              <div class="chip chip-accent" style="text-transform:none; padding:6px 14px; font-size:0.75rem;">
                <span class="material-symbols-outlined" style="font-size:14px;">person</span> ${email}
              </div>
            `).join('') : '<p style="color:var(--text-muted); font-size:0.8rem;">No team members added yet.</p>'}
          </div>
        </div>
      </div>

      <!-- Theme Customization -->
      <div class="card mb-24" style="background:var(--bg-elevated); border:1px solid var(--border);">
        <h3 class="section-heading" style="margin-top:0; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-outlined" style="color:var(--primary);">contrast</span> Appearance
        </h3>
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">Customize the look and feel of your workspace.</p>
        
        <button onclick="app.toggleTheme()" class="btn btn-primary" style="padding:10px 20px; display:flex; gap:8px; align-items:center;">
          <span class="material-symbols-outlined">contrast</span> Toggle Theme
        </button>
      </div>

      <!-- General User Guide -->
      <div class="card mb-24" style="background:var(--bg-elevated); border:1px solid var(--border);">
        <h3 class="section-heading" style="margin-top:0; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-outlined" style="color:var(--secondary);">menu_book</span> User Guide
        </h3>
        <div style="color:var(--text-dim); font-size:0.9rem; line-height:1.6; margin-top:10px;">
          <p style="margin-bottom:10px;"><strong>Welcome to MarkU, your AI Marketing OS.</strong> Here is how to get the most out of it:</p>
          <ul style="padding-left:20px; margin-bottom:10px;">
            <li style="margin-bottom:6px;"><strong>1. Create a Project Team:</strong> Use the dropdown above to create a dedicated profile for each client or project. Context is saved per project!</li>
            <li style="margin-bottom:6px;"><strong>2. Setup Product Context:</strong> Go to the Skills Hub and use the <em>Product Context</em> skill first. Tell the AI about your product, and it will remember for all future skills.</li>
            <li style="margin-bottom:6px;"><strong>3. Use the Skills Hub:</strong> Looking for SEO help? Need a mock landing page? Select the relevant skill from the Skills Hub and answer the AI's questions.</li>
            <li style="margin-bottom:6px;"><strong>4. Export Your Work:</strong> Inside any skill chat, click the PDF icon at the top to export your fully formatted marketing strategy.</li>
          </ul>
        </div>
      </div>

      <!-- Support / Contact -->
      <div class="card" style="background:var(--bg-elevated); border:1px solid var(--border);">
        <h3 class="section-heading" style="margin-top:0; font-size:1.1rem; display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-outlined" style="color:var(--accent);">support_agent</span> Feedback & Support
        </h3>
        <p style="color:var(--text-dim); font-size:0.85rem; margin-bottom:16px;">We are continuously improving MarkU. Let us know what integrations, skills, or features you want to see next! Directly email us at <strong>activohietz@gmail.com</strong>.</p>
        
        <form action="mailto:activohietz@gmail.com" method="GET" style="display:flex; flex-direction:column; gap:12px;">
          <input type="hidden" name="subject" value="MarkU Feedback & Support">
          <textarea name="body" placeholder="Describe your issue or feature request here..." style="width:100%; min-height:100px; background:var(--bg-input); border:1px solid var(--border); border-radius:8px; padding:12px; color:var(--text); font-family:inherit; resize:vertical;"></textarea>
          <button type="submit" class="btn btn-primary" style="align-self:flex-start;">Submit Ticket via Email</button>
        </form>
      </div>
    `;
  }

  app.editCurrentProject = function() {
    const activeProfileId = Storage.getActiveProfileId();
    const profiles = Storage.getProfiles();
    const p = profiles.find(x => x.id === activeProfileId);
    if (!p) return;

    window.modalTeam = [...(p.team || [])];
    
    app.showModal({
      title: 'Manage Project Team',
      body: `
        <div class="form-group">
          <label class="form-label">Project Name</label>
          <input type="text" id="modal-project-name" class="form-input" value="${p.name}">
        </div>
        <div class="form-group">
          <label class="form-label">Add Team Member (Email)</label>
          <div style="display:flex; gap:8px;">
            <input type="email" id="modal-team-email" class="form-input" placeholder="colleague@example.com">
            <button onclick="app.addTeamMemberToModal()" class="btn btn-primary" style="padding:0 12px;"><span class="material-symbols-outlined">add</span></button>
          </div>
          <div id="modal-team-list" class="team-list"></div>
        </div>
      `,
      footer: `
        <button onclick="app.closeModal()" class="btn btn-ghost">Cancel</button>
        <button onclick="app.updateProjectFromModal()" class="btn btn-primary">Save Changes</button>
      `
    });
    app.renderModalTeamList();
  };

  app.updateProjectFromModal = function() {
    const nameInput = $('#modal-project-name');
    const name = nameInput.value.trim();
    if (!name) return app.notify('Project name required');
    
    const activeProfileId = Storage.getActiveProfileId();
    const profiles = Storage.getProfiles();
    const idx = profiles.findIndex(x => x.id === activeProfileId);
    
    if (idx > -1) {
      profiles[idx].name = name;
      profiles[idx].team = [...window.modalTeam];
      Storage.saveProfiles(profiles);
      app.closeModal();
      app.notify(`Project updated: ${name}`);
      renderDashboard();
      if (currentView === 'settings') renderSettingsView();
    }
  };

  // Export Data to Local Device

  window.app.exportData = function() {
    const data = {
      sessions: Storage.getSessions(),
      profiles: Storage.getProfiles(),
      activeProfile: Storage.getActiveProfileId(),
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marku_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };

  function renderSupportView() {
    const el = $('#view-support');
    if (!el) return;
    el.innerHTML = `
      <h1 class="view-title">Experience & Support</h1>
      
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px; margin-bottom:24px;">
        <!-- Card 1: Direct Support -->
        <div class="card" style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:48px; height:48px; border-radius:14px; background:var(--primary-bg); display:flex; align-items:center; justify-content:center;">
               <span class="material-symbols-outlined" style="color:var(--primary); font-size:28px;">support_agent</span>
            </div>
            <div>
              <h3 style="margin:0; font-size:1.1rem; font-weight:800;">Concierge Support</h3>
              <p style="margin:0; color:var(--text-muted); font-size:0.75rem;">Response time: &lt; 24 hours</p>
            </div>
          </div>
          
          <p style="font-size:0.85rem; line-height:1.6; color:var(--text-dim); margin:0;">
            Found a bug? Requesting a custom Marketing Skill? Our core team is ready to assist you.
          </p>

          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:0.7rem;">Topic</label>
            <select id="support-subject" class="form-input" style="padding:10px;">
              <option>General Feedback</option>
              <option>Bug Report</option>
              <option>Skill Request</option>
              <option>Account Sync Issue</option>
              <option>White-labeling Request</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:0.7rem;">Description</label>
            <textarea id="support-message" class="form-input" style="min-height:100px; resize:vertical; padding:10px;" placeholder="How can we help you today?"></textarea>
          </div>

          <button onclick="app.submitSupportTicket()" class="btn btn-primary btn-full" style="padding:12px; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px;">
            <span class="material-symbols-outlined" style="font-size:18px;">send</span> Submit Ticket
          </button>
        </div>

        <!-- Card 2: Knowledge Base -->
        <div class="card" style="display:flex; flex-direction:column; gap:16px; background:var(--bg-elevated);">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="width:48px; height:48px; border-radius:14px; background:var(--secondary-bg); display:flex; align-items:center; justify-content:center;">
               <span class="material-symbols-outlined" style="color:var(--secondary); font-size:28px;">menu_book</span>
            </div>
            <div>
              <h3 style="margin:0; font-size:1.1rem; font-weight:800;">Resources</h3>
              <p style="margin:0; color:var(--text-muted); font-size:0.75rem;">Self-service documentation</p>
            </div>
          </div>

          <div class="flex-col gap-10">
            <div style="padding:12px; border-radius:10px; background:var(--bg); border:1px solid var(--border); display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="app.navigate('settings')">
              <span class="material-symbols-outlined" style="color:var(--accent); font-size:20px;">terminal</span>
              <div style="flex:1;">
                <div style="font-size:0.85rem; font-weight:700;">User Manual</div>
                <div style="font-size:0.7rem; color:var(--text-muted);">Master the Marketing OS</div>
              </div>
            </div>
            <div style="padding:12px; border-radius:10px; background:var(--bg); border:1px solid var(--border); display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="app.notify('Redirecting to Community Discord...')">
              <span class="material-symbols-outlined" style="color:#5865F2; font-size:20px;">groups</span>
              <div style="flex:1;">
                <div style="font-size:0.85rem; font-weight:700;">MarkU Community</div>
                <div style="font-size:0.7rem; color:var(--text-muted);">Share strategies with users</div>
              </div>
            </div>
            <div style="padding:12px; border-radius:10px; background:var(--bg); border:1px solid var(--border); display:flex; align-items:center; gap:12px; cursor:pointer;" onclick="app.checkForUpdates(true)">
              <span class="material-symbols-outlined" style="color:var(--green); font-size:20px;">settings_heart</span>
              <div style="flex:1;">
                <div style="font-size:0.85rem; font-weight:700;">System Status</div>
                <div style="font-size:0.7rem; color:var(--text-muted);">Tap to check for updates</div>
              </div>
            </div>
          </div>

          <div style="margin-top:auto; padding-top:10px; border-top:1px solid var(--border);">
            <p style="font-size:0.75rem; color:var(--text-dim); margin-bottom:8px;">Direct Developer Contact:</p>
            <a href="mailto:activohietz@gmail.com" style="display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--primary); font-weight:800; font-size:0.9rem;">
              <span class="material-symbols-outlined" style="font-size:18px;">mail</span> activohietz@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div class="card" style="background:linear-gradient(135deg, var(--primary-bg), transparent); border:1px solid var(--primary-border);">
        <h4 style="margin:0 0 10px 0; font-size:0.95rem; font-weight:800; color:var(--primary);">System Identity</h4>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Application Version</div>
            <div style="font-weight:700; font-size:0.9rem;">MarkU OS v4.2.1-stable</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Environment</div>
            <div style="font-weight:700; font-size:0.9rem; display:flex; align-items:center; gap:6px;">
              <span style="width:8px; height:8px; border-radius:50%; background:var(--green);"></span> Native Ready
            </div>
          </div>
          <button onclick="app.exportData()" class="btn btn-ghost btn-sm" style="border:1px solid var(--border); background:var(--bg);">
            <span class="material-symbols-outlined" style="font-size:16px;">backup</span> Advanced Backup
          </button>
        </div>
      </div>
      
      ${footerHTML}
    `;
  }

  app.submitSupportTicket = function() {
    const subject = $('#support-subject').value;
    const msg = $('#support-message').value.trim();
    if (!msg) return app.notify('Please enter a message');

    app.notify('Redirecting to email client...');
    const body = encodeURIComponent(`Subject: ${subject}\n\nMessage:\n${msg}\n\n---\nSent via MarkU Marketing OS`);
    window.location.href = `mailto:activohietz@gmail.com?subject=MarkU [${subject}]&body=${body}`;
    
    $('#support-message').value = '';
  };


  if (localStorage.getItem('marku_theme') === 'light') {
    document.body.classList.add('light-theme');
  }

  if(document.readyState === 'loading') { 
    document.addEventListener('DOMContentLoaded', () => {
      init();
      // Auto-check for updates on start (after 3s to not block init)
      setTimeout(() => checkForUpdates(false), 3000);
    }); 
  }
  else { 
    init(); 
    setTimeout(() => checkForUpdates(false), 3000);
  }
})();
