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

  var patient = firebase.database().ref();
  reload();
  patient.on('child_changed', data => {
    reload();
  });

  function reload() {
    var patients = document.getElementById('patients');
    while(patients.firstChild)
      patients.removeChild(patients.firstChild);
    patient.once('value', snap => {
      snap.forEach(child_snap => {
        let li = document.createElement('li');
        if(child_snap.val().status === "Ready")
          li.classList.add("green");
        else
          li.classList.add("white");
        li.innerText = child_snap.val().name + ": " + child_snap.val().status;
        patients.append(li);
      });
    });
  }
}
