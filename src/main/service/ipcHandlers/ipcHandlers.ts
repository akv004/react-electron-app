import { app, ipcMain, shell } from 'electron';
import Datastore from 'nedb';
import path from 'path';
import { RepoLink } from '../../../common/interfaces/RepoLink';

// Initialize NeDB
const nedb = new Datastore({
  filename: path.join(app.getPath('userData'), 'db.db'),
  autoload: true,
});



function setupUrlsManagementIPC() {
  console.log("Setting up URLs Management IPC");



  ipcMain.on('open-external', async (event, urlArray) => {
    // Extract the first element of the array to get the URL string
    const url = urlArray[0];
    try {
      // Now url is a string, so this should work
      await shell.openExternal(url);
    } catch (error) {
      console.error(`Failed to open URL: ${error}`);
    }
  });


  // Example IPC handler for adding a new RepoLink
  ipcMain.handle('add-repo-link', async (event, newRepoLink: RepoLink) => {
    return new Promise((resolve, reject) => {
      nedb.insert(newRepoLink, (err, document) => {
        if (err) {
          reject(new Error("Failed to add repo link"));
        } else {
          resolve(document);
        }
      });
    });
  });



  ipcMain.handle('get-urls', async () => {
    return new Promise<RepoLink[]>((resolve, reject) => {
      nedb.find({}, (err: Error | null, docs: RepoLink[]) => {
        if (err) {
          console.error("Error fetching URLs:", err);
          reject(new Error("Failed to fetch URLs"));
        } else {
          resolve(docs);
        }
      });
    });
  });


// Example modification to add a URL with labels and groups
  ipcMain.handle('add-url', async (event, { url, label, group }) => {
    return new Promise((resolve, reject) => {
      nedb.insert({ url, label, group }, (err, newDoc) => {
        if (err) {
          console.error("Error adding URL:", err);
          reject(new Error("Failed to add URL"));
        } else {
          console.log("URL added:", newDoc);
          resolve({ success: true });
        }
      });
    });
  });

// Fetch URLs with optional filtering by label or group
//   ipcMain.handle('get-urls', async (event, filter = {}) => {
//     return new Promise((resolve, reject) => {
//       nedb.find(filter, (err, docs) => {
//         if (err) {
//           console.error("Error fetching URLs:", err);
//           reject(new Error("Failed to fetch URLs"));
//         } else {
//           resolve(docs);
//         }
//       });
//     });
//   });
}
  export { setupUrlsManagementIPC };
