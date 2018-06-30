# gatsby-source-gdrive-tree

A gatsby source plugin that downloads the contents of a google drive folder recursivly with document and spreadsheet contents extracted.

## install

```bash
npm install --save gatsby-source-gdrive-tree
```

## usage

You need to have created a service account token with google and downloaded the `.json` file for it.

Also - you need to have given read access to a folder on google drive to that service account and have the id of the folder ready.

Then - you configure the plugin using the `gatsby-config.js` file as shown:

```javascript
module.exports = {
  siteMetadata: {
    title: 'My Example Google Drive Downloader',
  },
  plugins: [
    {
      resolve: 'gatsby-source-gdrive-tree',
      options: {
        folderId: process.env.GOOGLE_DRIVE_FOLDER_ID,
        serviceAccountToken: require(process.env.GOOGLE_DRIVE_SERVICE_TOKEN_FILE)
      }
    },
  ],
}
```

This will create the following types you can query using graphql:

```
googleDriveDocument(
  kind: googleDriveDocumentKindQueryString_2
  name: googleDriveDocumentNameQueryString_2
  mimeType: googleDriveDocumentMimeTypeQueryString_2
  contents: googleDriveDocumentContentsInputObject_2
  googleDriveId: googleDriveDocumentGoogleDriveIdQueryString_2
  id: googleDriveDocumentIdQueryString_2
  internal: googleDriveDocumentInternalInputObject_2
): GoogleDriveDocument

googleDriveSpreadSheet(
  kind: googleDriveSpreadSheetKindQueryString_2
  name: googleDriveSpreadSheetNameQueryString_2
  mimeType: googleDriveSpreadSheetMimeTypeQueryString_2
  contents: googleDriveSpreadSheetContentsInputObject_2
  googleDriveId: googleDriveSpreadSheetGoogleDriveIdQueryString_2
  id: googleDriveSpreadSheetIdQueryString_2
  internal: googleDriveSpreadSheetInternalInputObject_2
): GoogleDriveSpreadSheet

googleDriveFolder(
  kind: googleDriveFolderKindQueryString_2
  name: googleDriveFolderNameQueryString_2
  mimeType: googleDriveFolderMimeTypeQueryString_2
  googleDriveId: googleDriveFolderGoogleDriveIdQueryString_2
  id: googleDriveFolderIdQueryString_2
  internal: googleDriveFolderInternalInputObject_2
): GoogleDriveFolder


allGoogleDriveDocument(
  skip: Int
  limit: Int
  sort: googleDriveDocumentConnectionSort
  filter: filterGoogleDriveDocument
): GoogleDriveDocumentConnection

allGoogleDriveSpreadSheet(
  skip: Int
  limit: Int
  sort: googleDriveSpreadSheetConnectionSort
  filter: filterGoogleDriveSpreadSheet
): GoogleDriveSpreadSheetConnection

allGoogleDriveFolder(
  skip: Int
  limit: Int
  sort: googleDriveFolderConnectionSort
  filter: filterGoogleDriveFolder
): GoogleDriveFolderConnection
```

