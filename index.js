const { app, BrowserWindow } = require('electron')

async function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor:'#100238',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      show: false,

    },
  })

  // Load your hosted web app.
  await mainWindow.loadURL('https://nums.floatrx.net') // Replace with your web app's URL

  // Show the window when it's ready to be displayed.
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      mainWindow.show()
    }, 500)
  })

  // Open the DevTools optionally:
  // mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
