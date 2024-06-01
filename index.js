const { app, BrowserWindow } = require('electron')

const setZoomAndReload = (window, zoomFactor) => {
  window.webContents.setZoomFactor(zoomFactor)
  window.reload()
}

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({

    width: 540,
    height: 600,

    // ... extra
    backgroundColor: '#080215',
    hasShadow: false,
    zoomToPageWidth: true,
    titleBarStyle: 'hidden',

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      show: false,

    },
  })

  // Load your hosted web app.
  await mainWindow.loadURL('https://nums.floatrx.net') // Replace with your web app's URL

  // Set the default zoom factor to 150%
  setZoomAndReload(mainWindow, 1.5)

  // Show the window when it's ready to be displayed.
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      mainWindow.show()
    }, 500)
  })

  mainWindow.on('enter-full-screen', () => {
    setZoomAndReload(mainWindow, 2)
  })

  mainWindow.on('leave-full-screen', () => {
    setZoomAndReload(mainWindow, 1.5)
  })

  // Open the DevTools optionally:
  // mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow)


app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow()
  }
})
