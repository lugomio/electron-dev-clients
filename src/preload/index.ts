import { contextBridge, ipcRenderer } from 'electron'
import {
  electronAPI,
  type ElectronAPI,
} from '@electron-toolkit/preload'
import type {
  Customer,
  NewCustomer,
} from '../shared/types/ipc'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  onNewCustomer: (callback: () => void) => {
    ipcRenderer.on('new-customer', callback)
    return () => {
      ipcRenderer.off('new-customer', callback)
    }
  },
  addCustomer: (
    doc: NewCustomer
  ): Promise<PouchDB.Core.Response> =>
    ipcRenderer.invoke('add-customer', doc),
  fetchAllCostumers: (): Promise<Customer[]> =>
    ipcRenderer.invoke('fetch-all-customers'),
  fetchCustomerById: (docId: string): Promise<Customer> =>
    ipcRenderer.invoke('fetch-customers-id', docId),
  deleteCustomer: (docId: string): Promise<Customer> =>
    ipcRenderer.invoke('delete-customer', docId),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
