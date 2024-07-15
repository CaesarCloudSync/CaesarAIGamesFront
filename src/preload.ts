// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  store: {
    get(key:any) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property:any, val:any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    delete(key:any) {
      return ipcRenderer.sendSync('electron-store-delete', key);
    }
    // Other method you want to add like has(), reset(), etc.
  },
  // Any other methods you want to expose in the window object.
  // ...
});