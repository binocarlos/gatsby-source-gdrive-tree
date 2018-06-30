const createNodeHelpers = require('gatsby-node-helpers').default

const {
  createNodeFactory,
  generateNodeId,
  generateTypeName,
} = createNodeHelpers({
  typePrefix: `GoogleDrive`,
})

const FOLDER_TYPE = `Folder`
const DOCUMENT_TYPE = `Document`
const SPREADSHEET_TYPE = `SpreadSheet`

const NODE_TYPES = {
  'application/vnd.google-apps.folder': FOLDER_TYPE,
  'application/vnd.google-apps.document': DOCUMENT_TYPE,
  'application/vnd.google-apps.spreadsheet': SPREADSHEET_TYPE,
}

const Folder = createNodeFactory(FOLDER_TYPE, node => {
  if(node.contents) {
    node.children = node.contents.map(child =>
      generateNodeId(NODE_TYPES[child.mimeType], child.id)
    )
  }
  delete node.contents
  return node
})

const Document = createNodeFactory(DOCUMENT_TYPE)
const Spreadsheet = createNodeFactory(SPREADSHEET_TYPE)

module.exports = {
  Folder,
  Document,
  Spreadsheet,
}