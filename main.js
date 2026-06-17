const { app, BrowserWindow, Menu, dialog, shell } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 680,
    title: 'pričAjmo',
    backgroundColor: '#eef1f5',
    icon: path.join(__dirname, 'build', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    autoHideMenuBar: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'app.html'));

  // Vanjske poveznice (npr. arasaac.org) otvori u zadanom pregledniku
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });

  // Izvoz datoteka (PNG / SVG / JSON / piktogram) preko dijaloga "Spremi kao"
  mainWindow.webContents.session.on('will-download', (event, item) => {
    const name = item.getFilename();
    const ext = (path.extname(name).replace('.', '') || '').toLowerCase();
    const filters = ext
      ? [{ name: ext.toUpperCase(), extensions: [ext] }, { name: 'Sve datoteke', extensions: ['*'] }]
      : [{ name: 'Sve datoteke', extensions: ['*'] }];
    const savePath = dialog.showSaveDialogSync(mainWindow, { defaultPath: name, filters });
    if (savePath) { item.setSavePath(savePath); } else { item.cancel(); }
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

function buildMenu () {
  const isMac = process.platform === 'darwin';
  const tpl = [];

  if (isMac) {
    tpl.push({
      label: app.name,
      submenu: [
        { role: 'about', label: 'O programu pričAjmo' },
        { type: 'separator' },
        { role: 'hide', label: 'Sakrij' },
        { role: 'hideOthers', label: 'Sakrij ostale' },
        { role: 'unhide', label: 'Prikaži sve' },
        { type: 'separator' },
        { role: 'quit', label: 'Izlaz' }
      ]
    });
  }

  tpl.push({
    label: 'Datoteka',
    submenu: [
      {
        label: 'Ispis / spremi kao PDF…',
        accelerator: 'CmdOrCtrl+P',
        click: () => { if (mainWindow) mainWindow.webContents.executeJavaScript('window.print()'); }
      },
      { type: 'separator' },
      isMac ? { role: 'close', label: 'Zatvori prozor' } : { role: 'quit', label: 'Izlaz' }
    ]
  });

  tpl.push({
    label: 'Uredi',
    submenu: [
      { role: 'undo', label: 'Poništi' },
      { role: 'redo', label: 'Ponovi' },
      { type: 'separator' },
      { role: 'cut', label: 'Izreži' },
      { role: 'copy', label: 'Kopiraj' },
      { role: 'paste', label: 'Zalijepi' },
      { role: 'selectAll', label: 'Označi sve' }
    ]
  });

  tpl.push({
    label: 'Prikaz',
    submenu: [
      { role: 'reload', label: 'Ponovno učitaj' },
      { role: 'resetZoom', label: 'Stvarna veličina' },
      { role: 'zoomIn', label: 'Povećaj prikaz' },
      { role: 'zoomOut', label: 'Smanji prikaz' },
      { type: 'separator' },
      { role: 'togglefullscreen', label: 'Cijeli zaslon' },
      { type: 'separator' },
      { role: 'toggleDevTools', label: 'Alati za razvoj' }
    ]
  });

  tpl.push({
    label: 'Pomoć',
    submenu: [
      { label: 'ARASAAC (web)', click: () => shell.openExternal('https://arasaac.org') },
      { label: 'Povratne informacije (e-pošta)', click: () => shell.openExternal('mailto:tomislav.vitkovic.reh@gmail.com?subject=' + encodeURIComponent('pričAjmo — povratne informacije')) },
      { label: 'O Fitzgeraldovu ključu (web)', click: () => shell.openExternal('https://www.assistiveware.com/learn-aac/symbols-and-color-coding') }
    ]
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(tpl));
}

app.whenReady().then(() => {
  createWindow();
  buildMenu();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
