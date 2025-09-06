// Renderer process logic extracted from inline script with CSP-safe handlers

let snippets = [];
let filteredSnippets = [];
let currentEditId = null;
let contextMenuSnippetId = null;

function loadSnippets() {
  const saved = localStorage.getItem('snippets');
  if (saved) {
    try { snippets = JSON.parse(saved) || []; } catch { snippets = []; }
  }
  filteredSnippets = [...snippets];
}

function saveToStorage() {
  localStorage.setItem('snippets', JSON.stringify(snippets));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function generateTitle(content) {
  const firstLine = content.split('\n')[0].trim();
  if (firstLine.length > 0) return firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
  return content.length > 50 ? content.substring(0, 50) + '...' : content;
}

function openAddModal() {
  currentEditId = null;
  document.getElementById('snippetContent').value = '';
  const modal = document.getElementById('snippetModal');
  modal.style.display = 'block';
  modal.classList.add('show');
  setTimeout(() => document.getElementById('snippetContent').focus(), 50);
}

function openEditModal(id) {
  const snippet = snippets.find((s) => s.id === id);
  if (!snippet) return;
  currentEditId = id;
  document.getElementById('snippetContent').value = snippet.content;
  const modal = document.getElementById('snippetModal');
  modal.style.display = 'block';
  modal.classList.add('show');
  setTimeout(() => document.getElementById('snippetContent').focus(), 50);
}

function closeModal() {
  const modal = document.getElementById('snippetModal');
  modal.style.display = 'none';
  modal.classList.remove('show');
  currentEditId = null;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderSnippets() {
  const container = document.getElementById('snippetsContainer');
  const searchTerm = document.getElementById('searchInput').value.trim();

  if (filteredSnippets.length === 0) {
    if (searchTerm) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No results found</h3>
          <p>No snippets found matching "${escapeHtml(searchTerm)}"</p>
        </div>`;
    } else {
      container.innerHTML = `
        <div class="empty-state">
          <h3>No snippets yet</h3>
          <p>Click "ADD" button to create your first snippet</p>
        </div>`;
    }
    return;
  }

  const html = `
    <div class="snippets-grid">
      ${filteredSnippets
        .map((snippet) => {
          const preview = snippet.content.length > 100 ? snippet.content.substring(0, 100) + '...' : snippet.content;
          return `
            <div class="snippet-card" data-id="${snippet.id}" title="Click to copy">
              <div class="snippet-content">${escapeHtml(preview)}</div>
            </div>`;
        })
        .join('')}
    </div>`;

  container.innerHTML = html;
}

function updateStats() {
  const total = snippets.length;
  const filtered = filteredSnippets.length;
  const searchTerm = document.getElementById('searchInput').value.trim();

  document.getElementById('totalSnippets').textContent = `${total} snippet${total !== 1 ? 's' : ''}`;
  document.getElementById('filteredSnippets').textContent = searchTerm && filtered !== total ? `(${filtered} shown)` : '';
}

function filterSnippets(searchTerm) {
  if (!searchTerm.trim()) filteredSnippets = [...snippets];
  else {
    const term = searchTerm.toLowerCase();
    filteredSnippets = snippets.filter((snippet) => snippet.title.toLowerCase().includes(term) || snippet.content.toLowerCase().includes(term));
  }
  renderSnippets();
  updateStats();
}

async function copySnippetById(id, cardElement) {
  const snip = snippets.find((s) => s.id === id);
  if (!snip) return;
  try {
    await navigator.clipboard.writeText(snip.content);
    // visual feedback via CSS class
    cardElement.classList.add('copied');
    setTimeout(() => cardElement.classList.remove('copied'), 220);
  } catch (err) {
    alert('Failed to copy to clipboard');
    // eslint-disable-next-line no-console
    console.error('Failed to copy: ', err);
  }
}

function openSettingsModal() {
  const modal = document.getElementById('settingsModal');
  modal.style.display = 'block';
  modal.classList.add('show');

  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.getElementById('darkModeToggle').checked = isDarkMode;

  // Ask main process for real auto-start setting
  if (window.electronAPI && window.electronAPI.getAutoStart) {
    window.electronAPI.getAutoStart().then((res) => {
      const isAutoStart = res && res.success ? !!res.value : localStorage.getItem('autoStart') === 'true';
      document.getElementById('autoStartToggle').checked = isAutoStart;
    }).catch(() => {
      const isAutoStart = localStorage.getItem('autoStart') === 'true';
      document.getElementById('autoStartToggle').checked = isAutoStart;
    });
  }
}

function closeSettingsModal() {
  const modal = document.getElementById('settingsModal');
  modal.style.display = 'none';
  modal.classList.remove('show');
}

function applyDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

function toggleDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;
  const isEnabled = toggle.checked;
  localStorage.setItem('darkMode', String(isEnabled));
  applyDarkMode(isEnabled);
}

function toggleAutoStart() {
  const isEnabled = document.getElementById('autoStartToggle').checked;
  localStorage.setItem('autoStart', String(isEnabled));
  if (window.electronAPI && window.electronAPI.setAutoStart) {
    window.electronAPI.setAutoStart(isEnabled);
  }
}

// Event wiring
document.addEventListener('DOMContentLoaded', () => {
  loadSnippets();
  renderSnippets();
  updateStats();

  // Apply dark mode on load
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  applyDarkMode(isDarkMode);

  // Search
  document.getElementById('searchInput')?.addEventListener('input', (e) => {
    filterSnippets(e.target.value);
  });

  // Modal outside click close
  document.getElementById('snippetModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Key handlers
  document.addEventListener('keydown', (e) => {
    const snippetModal = document.getElementById('snippetModal');
    const settingsModal = document.getElementById('settingsModal');
    if (e.key === 'Escape') {
      if (snippetModal && snippetModal.style.display === 'block') closeModal();
      if (settingsModal && settingsModal.style.display === 'block') closeSettingsModal();
    }
    if (e.key === 'Enter' && e.ctrlKey && snippetModal && snippetModal.style.display === 'block') {
      document.getElementById('saveSnippetBtn')?.click();
    }
  });

  // Buttons
  document.getElementById('addBtn')?.addEventListener('click', openAddModal);
  document.getElementById('settingsBtn')?.addEventListener('click', openSettingsModal);
  document.getElementById('cancelSnippetBtn')?.addEventListener('click', closeModal);
  document.getElementById('saveSnippetBtn')?.addEventListener('click', () => {
    const content = document.getElementById('snippetContent').value.trim();
    if (!content) { alert('Content is required!'); return; }
    const title = generateTitle(content);
    if (currentEditId) {
      const index = snippets.findIndex((s) => s.id === currentEditId);
      if (index !== -1) {
        snippets[index] = { ...snippets[index], title, content, updatedAt: new Date().toISOString() };
      }
    } else {
      const newSnippet = { id: generateId(), title, content, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      snippets.unshift(newSnippet);
    }
    saveToStorage();
    closeModal();
    filterSnippets(document.getElementById('searchInput').value);
    updateStats();
  });
  document.getElementById('closeSettingsBtn')?.addEventListener('click', closeSettingsModal);

  // Settings toggles - using event delegation for reliability
  document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'darkModeToggle') {
      toggleDarkMode();
    } else if (e.target && e.target.id === 'autoStartToggle') {
      toggleAutoStart();
    }
  });

  // Context menu actions
  const contextMenu = document.getElementById('contextMenu');
  document.getElementById('contextEdit')?.addEventListener('click', () => {
    if (contextMenuSnippetId) openEditModal(contextMenuSnippetId);
    contextMenu.style.display = 'none';
  });
  document.getElementById('contextDelete')?.addEventListener('click', () => {
    if (contextMenuSnippetId && confirm('Are you sure you want to delete this snippet?')) {
      snippets = snippets.filter((s) => s.id !== contextMenuSnippetId);
      saveToStorage();
      filterSnippets(document.getElementById('searchInput').value);
      updateStats();
    }
    contextMenu.style.display = 'none';
  });

  // Hide context menu when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.context-menu') && !e.target.closest('.snippet-card')) {
      contextMenu.style.display = 'none';
      contextMenuSnippetId = null;
    }
  });

  // Delegate clicks and contextmenu on snippet cards
  const container = document.getElementById('snippetsContainer');
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.snippet-card');
    if (!card) return;
    const id = card.getAttribute('data-id');
    copySnippetById(id, card);
  });

  container.addEventListener('contextmenu', (e) => {
    const card = e.target.closest('.snippet-card');
    if (!card) return;
    e.preventDefault();
    contextMenuSnippetId = card.getAttribute('data-id');
    contextMenu.style.display = 'block';
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
  });
});

