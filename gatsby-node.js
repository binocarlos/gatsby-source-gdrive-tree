const googleDriveLoader = require('gdrive-tree')
const nodes = require('./nodes')

const NODE_TYPES = {
  'application/vnd.google-apps.folder': nodes.Folder,
  'application/vnd.google-apps.document': nodes.Document,
  'application/vnd.google-apps.spreadsheet': nodes.Spreadsheet,
}

const dataFolderName = '_nocode_data'

exports.sourceNodes = (
  { boundActionCreators },
  { 
    serviceAccountToken, 
    folderId,
  },
  done
) => {
  const { createNode } = boundActionCreators

  // a map of the file id -> the JSON file data for that item
  const _nodecode_data = {}

  const nodeFactory = (item, parentNode) => {
    // get the nodeFactory based on the mimeType
    const nodeType = NODE_TYPES[item.mimeType]
    if(!nodeType) throw new Error(`unknown data mimeType: ${item.mimeType} - id: ${item.id} - name: ${item.name}`)

    item.nocodeData = Object.assign({
      noCode: true,
    }, _nodecode_data[item.id])

    // create the node data using the factory
    // point at the parent node if given
    const node = nodeType(item, parentNode ? {
      parent: parentNode.id,
      parentName: parentNode ? parentNode.name : null,
    } : null)

    // register the node with gatsby
    try {
      createNode(node)  
    } catch(e) {
      
      console.log('-------------------------------------------');
      console.log('-------------------------------------------');
      console.log('error')
      console.log(e.toString())
      console.log(JSON.stringify(node, null, 4))
      return done(e)
    }
    

    // if it's a folder then loop over the contents and recurse
    if(nodeType === nodes.Folder) {
      item.contents.forEach(childItem => nodeFactory(childItem, node))
    }

  }

  // is the given item the data folder?

  const isDataFolder = (item) => item.mimeType == 'application/vnd.google-apps.folder' && item.name == dataFolderName
  const getDataFolder = (topItems) => topItems.filter(isDataFolder)[0]

  // load the data tree from google drive
  googleDriveLoader({
    serviceAccountToken,
    itemId: folderId,
    logging: true,
  }, (err, results) => {
    if(err) return done(err)

    // get a reference to the data folder
    const dataFolder = getDataFolder(results)

    if(dataFolder) {
      dataFolder.contents.forEach(dataFileItem => {
        const itemId = dataFileItem.name.split('.')[0]
        _nodecode_data[itemId] = dataFileItem.contents
      })
    }

    const topLevelItems = results.filter(result => isDataFolder(result) ? false : true)

    // loop over the root items
    // we don't pass a parent because these are at the top
    topLevelItems.forEach(item => nodeFactory(item))
    done()
  })
}