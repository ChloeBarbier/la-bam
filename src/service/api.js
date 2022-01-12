import firebase from './firebase';

export const writeUserData = (authUser, likedWords) => {
    console.log("authUser.uid", authUser.uid)
    console.log("authUser", authUser)
    console.log("likedWords", likedWords)
    firebase.database().ref('users/' + authUser.uid).set({
      ...authUser,
      likedWords
    });
  }

//   writeUserData(0, "test", "email@email.com");