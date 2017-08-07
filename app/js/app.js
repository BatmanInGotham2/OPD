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
    var patient = firebase.database().ref().limitToFirst(1);
    
    patient.once('value', snap => {
      snap.forEach(child_snap => {
        if(child_snap.val().status === "Ready") {
          firebase.database().ref().child(child_snap.key).remove();
          var new_patient = firebase.database().ref().limitToFirst(1);
          new_patient.once('value', snapshot => {
            snapshot.forEach(child => {
              firebase.database().ref().child(child.key).update({status: "Ready"});
            })
          })
        } else {
          firebase.database().ref().child(child_snap.key).update({status: "Ready"});
        }
      })
    });
  });

  add_patient.addEventListener('click', e => {
    new_user.value = '';
    new_user.autofocus;
  });

  add_patient_form_button.addEventListener('click', e => {
    var newPerson = {
      name: new_user.value,
      status: "Not Ready"
    };
    var new_key_ref = firebase.database().ref().push(newPerson);
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log("You logged on successfully!");
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
