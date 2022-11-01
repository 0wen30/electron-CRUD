const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('productosApp', {
    enviar: (channel, ...data) => ipcRenderer.send(channel, ...data),
    recibir: (channel, miFuncion) => ipcRenderer.on(channel, (event, ...args) => miFuncion(...args))
});

/*
contextBridge.exposeInMainWorld('productosApp', {
    enviar: (channel, ...data) => {
        let validChannels = ["toMain"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, ...data);
        }
    },
    recibir: (channel, miFuncion) => {
        let validChannels = ["fromMain"];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => miFuncion(...args));
        }
    }
});
*/