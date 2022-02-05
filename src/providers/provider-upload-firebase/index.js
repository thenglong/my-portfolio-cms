const admin = require("firebase-admin");
let bucket = undefined;

module.exports = {
  init(providerOptions) {
    // initialize firebase provider
    if (!bucket) {
      if (admin.apps.length === 0) {
        const credential = admin.credential.cert(providerOptions.serviceAccount);

        admin.initializeApp({
          credential,
          storageBucket: providerOptions.bucket,
        });
      }
      bucket = admin.storage().bucket();
    }

    return {
      upload: (file, customParams = {}) =>
        uploadFile(file, customParams, providerOptions),
      delete: deleteFile,
    };
  },
};

function uploadFile(file, customParams, providerOptions) {
  // triggered when you attempt a upload operation in the media library
  return new Promise((resolve, reject) => {
    const path = file.path ? `${file.path}/` : "";
    const filename = `${path}${file.hash}${file.ext}`;
    const buff = Buffer.from(file.buffer, "binary");
    const remoteFile = bucket.file(filename);
    remoteFile.save(
      buff,
      {
        resumable: false,
        contentType: file.mime,
        public: true,
      },
      err => {
        if (err) {
          reject(err);
        }

        //using the url norms given by firebase storage, instead of getting them from getUrl() function
        file.url = `https://storage.googleapis.com/${providerOptions.bucket}/${filename}`;
        resolve();
      }
    );
  });
}

function deleteFile(file, customParams = {}) {
  // triggered when you attempt a delete operation in the media library
  return new Promise((resolve, reject) => {
    const path = file.path ? `${file.path}/` : "";
    const filename = `${path}${file.hash}${file.ext}`;
    const remoteFile = bucket.file(filename);
    remoteFile.delete((err, _) => {
      if (err) {
        if (err.code === 404) {
          // image that is being deleting is not available in storage bucket
          resolve();
        }
        return reject(err);
      }
      resolve();
    });
  });
}
