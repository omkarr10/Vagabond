const { app, BrowserWindow } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools(); 
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));

    // ✅ Open DevTools in production for debugging
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// ✅ Handle macOS specific behavior and re-opening
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// ✅ Properly quit on all platforms
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
