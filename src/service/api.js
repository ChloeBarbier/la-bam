import firebase from './firebase';
import isObject from 'lodash/isObject';
import isEqual from 'lodash/isEqual';
import { setLikedWords } from '../config/state.dispatch';
/**
 * database = {
 *  users: {
 *      X356TJFGD4788DFSFH447: {
 *          userAuth : { 
 *              uid: "X356TJFGD4788DFSFH447",
 *              displayName: "Michel Tremblay",
 *              ...
 *          },
 *          likedWords: {
 *              chocolat: 123456789345600,
 *              vanille: 123456789347890,
 *              ...
 *          }
 *      },
 *      ...
 *  }
 * }
 * 
 */
/**
 * Create user
 * @param {Object} userAuth 
 */
 export const createUserDB = (userAuth) => {
    //  console.log("--CREATE user--");
    // Carefull, user first connexion only or it will erase user
    console.log({ userAuth, likedWords: {} })
    firebase.database()
    .ref('users/' + userAuth.uid)
    .set({ userAuth, likedWords: {} })
    .catch(error => console.error(error));
};
/**
 * Update userAuth
 * @param {Object} userAuth
 */
export const updateUserAuthDB = (userAuth) => {
    // console.log("--UPDATE userAuth--");
    firebase.database()
    .ref('users/' + userAuth.uid)
    .update({ userAuth })
    .catch(error => console.error(error));
};
/**
 * Update likedWords
 * @param {*} uid 
 * @param {*} likedWords 
 * @param {*} word 
 */
 export const updateLikedWordsDB = (uid, likedWords, word) => {
    // console.log("--UPDATE likedWords--"); 
    let newLikedWords;
    if (likedWords[word] === undefined) {
        newLikedWords = { ...likedWords, [word]: new Date().getTime() };
    }
    else {
        newLikedWords = { ...likedWords };
        delete newLikedWords[word];
    }
    firebase.database()
    .ref('users/' + uid)
    .update({ likedWords: newLikedWords })
    .catch(error => console.error(error));
};
/**
 * Initialization : 
 * OR Update userAuth AND get likedWords AND dispatch likedWords 
 * OR Create user
 * @param {Object} userAuth
 */
 export const initializeDatabaseAndState = (dispatch, userAuth) => {
    // console.log("--UPDATE userAuth OR CREATE user--");
    firebase.database()
    .ref('users/' + userAuth.uid)
    .once('value', userNode => {
        const user = userNode.val();
        if (isObject(user)) {
            if (!isEqual(userAuth, user)) {
                updateUserAuthDB(userAuth);
            }
            const { likedWords } = user;
            if (likedWords && Object.keys(likedWords).length > 0) {
                const orderedLikedWords = Object.fromEntries(
                    // liked words value is the time at word clicked
                    Object.entries(likedWords).sort(([,a],[,b]) => a-b)
                );
                setLikedWords(dispatch, orderedLikedWords);
            }
        } else createUserDB(userAuth);
    })
    .catch(error => console.error(error));
};