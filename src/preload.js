const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	getVersions: () => {
		return {
			node: process.versions.node,
			chrome: process.versions.chrome,
			electron: process.versions.electron,
		};
	},
	setAutoStart: (enabled) => ipcRenderer.invoke('set-auto-start', enabled),
	getAutoStart: () => ipcRenderer.invoke('get-auto-start'),
});
