import {
  Menu,
  Tray,
  nativeImage,
  type BrowserWindow,
} from 'electron'

import path from 'node:path'

export function createTray(window: BrowserWindow) {
  const appIcon = path.join(
    __dirname,
    'resources',
    'menuTemplate.png'
  )

  const icon = nativeImage.createFromPath(appIcon)
  const tray = new Tray(icon)
  const menu = Menu.buildFromTemplate([
    {
      label: 'Dev Clientes',
      enabled: false,
    },
    { type: 'separator' },
    {
      label: 'Abrir',
      click: () => {
        window.show()
      },
    },
    {
      label: 'Cadastrar Cliente',
      click: () => {
        window.webContents.send('new-customer')
        if (window.isMinimized()) {
          window.restore()
          window.focus()
        }
      },
    },
    { type: 'separator' },
    {
      label: 'Sair',
      role: 'quit',
    },
  ])

  tray.setContextMenu(menu)
  tray.setToolTip('Dev Clientes')
}
