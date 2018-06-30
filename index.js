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
  'application/vnd.google-apps.folder': {
    name: FOLDER_TYPE,
    processor: (node) => {
      
    }
  },
  'application/vnd.google-apps.document': {
    name: DOCUMENT_TYPE,
    processor: (node) => {

    }
  },
  'application/vnd.google-apps.spreadsheet': {
    name: SPREADSHEET_TYPE,
    processor: (node) => {

    }
  }
}

const getNodeTypeName = (node) => (NODE_TYPES[node.mimeType] || {}).name

const Folder = createNodeFactory(FOLDER_TYPE, node => {
  if(node.contents) {
    node.children = node.contents.map(child =>
      generateNodeId(getNodeTypeName(child), child.id)
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