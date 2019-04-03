import uuid from 'uuid';
import firebase from 'firebase';
/**
 * Uploads a new Picture to Cloud Storage and returns a download URL.
 */
export default async function uploadImageAsync(uri, localUri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', localUri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref(uri)
    .child(uuid());
  const snapshot = await ref.put(blob);

  blob.close();

  return snapshot.ref.getDownloadURL();
}
