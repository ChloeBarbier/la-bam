import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';

/**
 * set authentified user information
 * @param {function} dispatch 
 * @param {object} user 
 */
export const setAuthUser = (dispatch, user) => {
    if (!isEmpty(user) && dispatch instanceof Function) {
        dispatch({ 
            type: 'setAuthUser', 
            authUser: {
                creationTime: user.metadata.creationTime,
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                lastSignInTime: user.metadata.lastSignInTime,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                providerId: user.providerData[0].providerId,
                providerUid: user.providerData[0].uid,
                uid: user.uid
            }
        });
    }
};
/**
 * set word status to liked
 * @param {function} dispatch 
 * @param {object} likedWords 
 * @param {string} word 
 */
export const setWordIsUnliked = (dispatch, likedWords, word) => {
    if (isString(word) && dispatch instanceof Function) {
        delete likedWords[word];
        dispatch({ 
            type: 'setLikedWords', 
            likedWords
        });
    }
};
/**
 * Reverse word status. It was liked, set unliked, and vice versa
 * @param {function} dispatch 
 * @param {object} likedWords 
 * @param {string} word 
 */
export const setWordStatus = (dispatch, likedWords, word) => {
    if (isString(word) && dispatch instanceof Function) {
        if (likedWords[word] === undefined) {
            dispatch({ 
                type: 'setLikedWords', 
                likedWords: {
                    ...likedWords,
                    [word]: new Date().getTime()
                } 
            });
        }
        else setWordIsUnliked(dispatch, likedWords, word);
    }
};