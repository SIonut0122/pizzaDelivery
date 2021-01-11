var config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "pizzadelivery-377e2.firebaseapp.com",
    databaseURL: "https://pizzadelivery-377e2.firebaseio.com",
    projectId: "pizzadelivery-377e2",
    storageBucket: "pizzadelivery-377e2.appspot.com",
    messagingSenderId: "755299552648",
    appId: "1:755299552648:web:1b2eac2229419a6899fe3d"
  };

  
  // Initialize Firebase
  firebase.initializeApp(config);