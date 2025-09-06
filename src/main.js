const { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let tray;
let isQuitting = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 350,
    frame: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, '../icon-256x256.ico')
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  // Close to tray: hide window on close instead of blur
  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });

  // Auto-hide on blur (click outside)
  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });

  // Security: prevent external navigation and popups
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.webContents.on('will-navigate', (event, url) => {
    const currentURL = mainWindow.webContents.getURL();
    if (url !== currentURL) event.preventDefault();
  });

  // Initialize auto-start moved to IPC get-auto-start for safer flow
}

function createTray() {
  // Buat tray icon menggunakan icon yang ada atau icon default
  const iconPath = path.join(__dirname, 'icon-32x32.ico');
  let trayIcon;
  
  try {
    trayIcon = nativeImage.createFromPath(iconPath);
    if (trayIcon.isEmpty()) {
      // Jika icon.png tidak ada, buat icon sederhana dari text
      trayIcon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
    }
  } catch (error) {
    // Fallback jika ada error
    trayIcon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
  }
  
  tray = new Tray(trayIcon);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => {
        mainWindow.show();
      }
    },
    {
      label: 'Hide',
      click: () => {
        mainWindow.hide();
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click: () => {
        isQuitting = true;
        app.quit();
      }
    }
  ]);
  
  tray.setContextMenu(contextMenu);
  tray.setToolTip('Copas');
  
  // Klik tray icon untuk toggle show/hide
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
}

// Single-instance lock
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}
else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (!mainWindow.isVisible()) mainWindow.show();
      mainWindow.focus();
    }
  });
}

app.whenReady().then(() => {
  // Ensure Windows notifications and taskbar grouping have a valid App User Model ID
  try { app.setAppUserModelId('com.copas.snippet-manager'); } catch {}
  createWindow();
  createTray();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handler for auto-start setting
ipcMain.handle('set-auto-start', async (event, enabled) => {
  try {
    app.setLoginItemSettings({
      openAtLogin: enabled,
      path: process.execPath,
      args: ['--startup']
    });
    return { success: true };
  } catch (error) {
    console.error('Error setting auto start:', error);
    return { success: false, error: error.message };
  }
});

// IPC: get auto-start setting
ipcMain.handle('get-auto-start', async () => {
  try {
    const { openAtLogin } = app.getLoginItemSettings();
    return { success: true, value: openAtLogin };
  } catch (error) {
    console.error('Error getting auto start:', error);
    return { success: false, error: error.message };
  }
});
