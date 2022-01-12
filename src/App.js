import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './App.scss';
import { Provider } from './config/state.manager';
import Form from './Form';
import AppTitle from './AppTitle';
import firebase from './service/firebase';
 
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const uiConfig = {
    // signInFlow: "popup",
    signInOptions: [
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: "Avec Google"
      },
      // {
      //   provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //   fullLabel: "Avec Facebook"
      // },
      // {
      //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //   fullLabel: "Avec une adresse email"
      // }
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }

  const onClickGuestSession = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    firebase.auth().signOut();
    setIsSignedIn(false);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      setUser(user);
    })
  }, []);
    
  return (
    <Provider>
      <div id="la-bam" className="App">
          <main className="main">
            <AppTitle 
              isSignedIn={isSignedIn} 
              signOut={signOut} 
              />
            <div className="App-content">
              {isSignedIn ? (
                <Form user={user} />
                ) : (
                <div>
                  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                  <button className="grid-x-cell button guest" onClick={onClickGuestSession} type="button">
                    <i className="bi bi-person-circle" role="img" aria-label="guest"></i>
                    {/* <i className="bi bi-cup-straw" role="img" aria-label="guest"></i> */}
                    <span>Session Invité</span>
                  </button>
                </div>
              )}
            </div>
          </main>
        <footer><i style={{fontSize:'.75rem', color:'lightslategrey'}}>la-bam - en cours de développement</i></footer>
      </div>
    </Provider>
  );
};


export default App;
