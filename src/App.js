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
    // signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: "Avec Google"
      },
      {
        provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        fullLabel: "Avec Facebook"
      },
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: "Avec une adresse mail"
      }
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
          <main className="main">
            <AppTitle 
              isSignedIn={isSignedIn} 
              signOut={() => firebase.auth().signOut()} 
              displayName={firebase.auth().currentUser?.displayName} 
              />
            <div className="App-content">
              {isSignedIn ? (
                <Form />
                ) : (
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
              )}
            </div>
          </main>
        <footer><i style={{fontSize:'.75rem', color:'lightslategrey'}}>la-bam - en cours de développement</i></footer>
      </div>
    </Provider>
  );
};


export default App;
