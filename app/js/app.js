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

  const submit_button = document.getElementById('submit-button');
  const exit_button = document.getElementById('exit-button');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const next_patient = document.getElementById('next-patient');
  const add_patient_form_button = document.getElementById('add');
  const add_patient = document.getElementById('add-patient');
  const signup_modal = document.getElementById('signup-modal');
  const new_user = document.getElementById('name');

  submit_button.addEventListener('click', e => {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(error => {
      console.log(error.code + " " + error.message);
    })
  });

  exit_button.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  next_patient.addEventListener('click', e => {
    var db = firebase.database().ref().once('value').then(snap => {
      let remove_patient = Object.keys(snap.val())[0];
      console.log(remove_patient);
      firebase.database().ref().child(remove_patient).remove();
    });
  });

  add_patient_form_button.addEventListener('click', e => {
    var newPerson = {};
    newPerson[new_user.value] = "Not Ready";
    firebase.database().ref().update(newPerson);
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      alert("You logged on successfully!");
      exit_button.classList.remove('hide');
      next_patient.classList.remove('hide');
      add_patient.classList.remove('hide');
      submit_button.disabled = true;
    } else {
      exit_button.classList.add('hide');
      next_patient.classList.add('hide');
      add_patient.classList.add('hide');
      submit_button.disabled = false;
    }
  });
}
