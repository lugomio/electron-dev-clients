import { app, ipcMain } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import PouchDB from 'pouchdb'
import type {
  Customer,
  NewCustomer,
} from '../shared/types/ipc'
import { randomUUID } from 'node:crypto'

let dbPath: string
if (process.platform === 'darwin') {
  dbPath = path.join(
    app.getPath('appData'),
    'devclientes',
    'my-db'
  )
} else {
  dbPath = path.join(app.getPath('userData'), 'my-db')
}

const dbDir = path.dirname(dbPath)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const db = new PouchDB<Customer>(dbPath)

async function addCustomer(
  doc: NewCustomer
): Promise<PouchDB.Core.Response> {
  const id = randomUUID()
  const data: Customer = {
    ...doc,
    _id: id,
  }

  return db
    .put(data)
    .then(response => response)
    .catch(err => {
      console.error('ERRO AO CADASTRAR', err)
      return {
        ok: false,
        id: '',
        rev: '',
      } as PouchDB.Core.Response
    })
}

ipcMain.handle(
  'add-customer',
  async (event, doc: Customer) => {
    const result = await addCustomer(doc)
    return result
  }
)

async function fetchAllCustomers(): Promise<Customer[]> {
  try {
    const result = await db.allDocs({ include_docs: true })
    return result.rows.map(row => {
      return row.doc as Customer
    })
  } catch (err) {
    console.log('ERRO NA BUSCA')
    return []
  }
}

ipcMain.handle('fetch-all-customers', async () => {
  return await fetchAllCustomers()
})

async function fetchCustomerById(docId: string) {
  return db
    .get(docId)
    .then(doc => doc)
    .catch(err => {
      console.error('ERRO AO BUSCAR POR ID', err)
      return null
    })
}

ipcMain.handle(
  'fetch-customers-id',
  async (event, docId) => {
    return await fetchCustomerById(docId)
  }
)

async function deleteCustomer(
  docId: string
): Promise<PouchDB.Core.Response | null> {
  try {
    const doc = await db.get(docId)
    const result = await db.remove(doc)
    return result
  } catch (err) {
    console.error('ERRO AO DELETAR', err)
    return null
  }
}

ipcMain.handle(
  'delete-customer',
  async (
    event,
    docId
  ): Promise<PouchDB.Core.Response | null> => {
    return await deleteCustomer(docId)
  }
)
