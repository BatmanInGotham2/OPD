window.onload = function() {
  var config = {
    apiKey: "AIzaSyAfY-WNcyHekKdObIbfiK_tIa4TT_0-Ius",
    authDomain: "opdinitial.firebaseapp.com",
    databaseURL: "https://opdinitial.firebaseio.com",
    projectId: "opdinitial",
    storageBucket: "opdinitial.appspot.com",
    messagingSenderId: "861826471705"
  };
  firebase.initializeApp(config);

  // Initialize Firebase
  var db = firebase.database().ref().once('value').then(snap => {
    var people = snap.val();
    for(var person in people) {
      if(people.hasOwnProperty(person)) {
        let patients = document.getElementById('patients');
        let li = document.createElement('li');
        li.innerText = person + ": " + people[person];
        patients.append(li);
      }
    }
  });


}
