import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './App.scss';
import { Provider } from './config/state.manager';
import Form from './Form';
import AppTitle from './AppTitle';
import firebase from './service/firebase';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    })
  }, []);
    
  return (
    <Provider>
      <div id="la-bam" className="App">
        {isSignedIn ? (
          <main className="main">
            <AppTitle displayName={firebase.auth().currentUser.displayName} />
            <div className="App-content">
              <Form />
              {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}
            </div>
            <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
          </main>
         ) : (
         <div>
           <div>Connexion</div>
           <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
         </div>
         )
        }
        <footer><i style={{fontSize:'.75rem', color:'lightslategrey'}}>la-bam - en cours de développement</i></footer>
      </div>
    </Provider>
  );
};


export default App;
