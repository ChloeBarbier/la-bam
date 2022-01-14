import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

/**
 * set authentified user information
 * @param {function} dispatch 
 * @param {object} user 
 */
export const setUserAuth = (dispatch, userAuth) => {
    if (!isEmpty(userAuth) && dispatch instanceof Function) {
        dispatch({ 
            type: 'setUserAuth', 
            userAuth
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
        const newLikedWords = { ...likedWords };
        delete newLikedWords[word];
        dispatch({ 
            type: 'setLikedWords', 
            likedWords: newLikedWords
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

export const setLikedWords = (dispatch, likedWords) => {
    console.log('setLikedWords 1', isObject(likedWords), dispatch instanceof Function)
    if (isObject(likedWords) && dispatch instanceof Function) {
        dispatch({ 
            type: 'setLikedWords', 
            likedWords
        });
    }
};