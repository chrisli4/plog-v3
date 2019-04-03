import uuid from 'uuid';
import uploadImageAsync from '../Utils/uploadImage';
import shrinkImageAsync from '../Utils/shrinkImage';
import firebaseConfig from '../Config/firebase';

const firebase = require('firebase');
require('firebase/firestore');

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
  }

  static get POSTS_PAGE_SIZE() {
    return 3;
  }

  static get PLANTS_PAGE_SIZE() {
    return 3;
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  collection(ref) {
    return firebase.firestore().collection(ref);
  }

  get timestamp() {
    return Date.now();
  }

  generateKey() {
    return firebase
      .database()
      .ref()
      .push().key;
  }

  getPosts = async (start, pid = null) => {
    let ref = this.collection('posts');
    try {
      if (pid) {
        ref = ref.where('pid', '==', pid);
      }

      ref = ref.orderBy('timestamp', 'desc').limit(Fire.POSTS_PAGE_SIZE);

      if (start) {
        ref = ref.startAfter(start);
      }
      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(doc => {
        if (doc.exists) {
          const post = doc.data() || {};
          data.push(post);
        }
      });
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  getPlants = async (start, uid) => {
    let ref = this.collection('plants')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(Fire.PLANTS_PAGE_SIZE);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }
      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(doc => {
        if (doc.exists) {
          const post = doc.data() || {};
          data.push(post);
        }
      });
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  uploadPhotoAsync = async uri => {
    const path = `${uuid.v4()}.jpg`;
    return uploadImageAsync(path, uri);
  };

  post = async (ref, id, item, localUri) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri
      );
      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      this.firestore
        .collection(ref)
        .doc(id)
        .set({
          ...item,
          id,
          uid: this.uid,
          timestamp: this.timestamp,
          imageWidth: width,
          imageHeight: height,
          image: remoteUri,
        });
    } catch ({ message }) {
      alert(message);
    }
  };
}

Fire.shared = new Fire();
export default Fire;
