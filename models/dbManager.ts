const Database = require('better-sqlite3')
import * as path from 'path'

const dbPath =
  process.env.NODE_ENV === 'development'
    ? './todos.db'
    : path.join(process.resourcesPath, './todos.db')

const db = new Database(dbPath)
db.pragma('journal_mode = WAL')

export default db
