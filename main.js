const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const url = require("url");

if (process.env.NODE_ENV !== "production") {
    require('electron-reload')(__dirname);
}


let mainWindow;

const webPreferences = { preload: path.join(__dirname, 'preload.js') }

app.on("ready", () => {
    mainWindow = new BrowserWindow({ webPreferences });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: 'file',
        slashes: true
    }));
    //---------------CERRAR--------------

    mainWindow.on("closed", () => {
        app.quit();
    })

    //---------------MENU----------------

    Menu.setApplicationMenu(Menu.buildFromTemplate(templateMenu));
});

const templateMenu = [
    {
        label: "Archivo",
        submenu: [
            {
                label: "Nuevo",
                accelerator: "Ctrl+N",
                click() {
                    createNewProductWindow();
                }
            },
            {
                label: "Borrar todo",
                click() {

                }
            },
            {
                label: "Salir",
                accelerator: process.platform == "darwin" ? "command + X" : "Ctrl+X",
                click() {
                    app.quit();
                }
            }
        ]
    }
];

if (process.env.NODE_ENV !== "production") {
    templateMenu.push({
        label: "DevTools",
        submenu: [
            {
                label: "Show/Hide DevTools",
                accelerator: "ctrl+d",
                click(_, focus) {
                    focus.toggleDevTools();
                }
            },
            {
                role: "reload"
            }
        ]
    });
}

if (process.platform == "darwin") {
    templateMenu.unshift({
        label: app.getName()
    })
}

const createNewProductWindow = () => {
    newProductWindow = new BrowserWindow({ width: 300, height: 320, webPreferences });
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, "newProduct.html"),
        protocol: 'file',
        slashes: true
    }));
    //-------------CERRAR--------------
    newProductWindow.on("closed", () => {
        newProductWindow = null;
    });
    //------DESACTIVAR MENU-------------
    //newProductWindow.setMenu(null);
}

ipcMain.on("enviar", (event, ...info) => {
    mainWindow.webContents.send("recibir", ...info);
    BrowserWindow.fromWebContents(event.sender).close();
});