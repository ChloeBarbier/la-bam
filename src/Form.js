import React from 'react';
import { Context } from './config/state.manager';
// import Word from './Word';
import Parameter from './Parameter';
import generate from './generation/generate';
import { setUserAuth, setWordStatus } from './config/state.dispatch';
import { sizeOptions, listOptions, alphabetOptions } from './constants';
import { initializeDatabaseAndState, updateLikedWordsDB } from './service/api';

const Form = ({ auth }) => {
  const { state, dispatch } = React.useContext(Context);
  const { parameters, lists, likedWords, userAuth } = state;
  const [myLists, setMyLists] = React.useState();
  const [words, setWords] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [dictionary, setDictionary] = React.useState();
  
  // const languageOption = languageOptions[parameters.language];
  // console.log("words", words);
  
  const onGenerate = () => {
    let newWords = [];
    // let dictio = dictionary;
    // if (!dictionary || dictionary.length === 0) {
    //   const language = languageOptions[parameters.language];
    //   dictio = state[language.dictionary];
    // }
    let dictio = dictionary;
    
    if (!dictionary || dictionary.length === 0) {
      dictio = lists[parameters.list];
    }
    for(var i=0; i<100; i++) {
      newWords.push(generate(parameters, dictio));
    }
    let colorsArray = [];
    newWords.forEach(() => colorsArray.push(Math.floor(Math.random() * 10)));
    setWords(newWords);
    setColors(colorsArray);
  };

  const getHasLikedWords = (word) => {
    return Object.keys(likedWords).length > 0 && likedWords[word] !== undefined;
  };

  const onClickWord = (word) => {
    setWordStatus(dispatch, likedWords, word);
    // if user isn't connected as guest
    if (userAuth.uid) updateLikedWordsDB(userAuth.uid,likedWords, word);
  };

  React.useEffect(() => {
    let newLists = {};
    listOptions.forEach(option => {
      fetch(option.path).then(response => {
        response.text().then(response => {
            response = response.split('\n');
            newLists = {
              ...newLists,
              [option.value]: response 
            };
            setMyLists(newLists);
          })
        });
      }
    );
    // Reinit likedWords in case of logout then login on another account (useless, done onSignout)
    // setLikedWords(dispatch, initialState.likedWords);
    // setUserAuth(dispatch, initialState.userAuth);
  }, []);

  React.useEffect(() => {
    dispatch({ 
      type: 'setLists',
      lists: myLists
    });
  }, [myLists, dispatch]);

  React.useEffect(() => {
    setDictionary(lists[parameters.list]);
  }, [lists, parameters.list]);

  React.useEffect(()=> {
    // init after connexion
    setUserAuth(dispatch, auth);
  }, [auth, dispatch]);

  React.useEffect(()=> {
    // init from db, if user isn't connected as guest
    if (userAuth.uid) initializeDatabaseAndState(dispatch, userAuth);
  }, [userAuth, dispatch])

  return (
      <div className="grid-y">
        {/* <div className="">
          <Parameter title="Originalité" options={originalityOptions} name='originality' />
        </div> */}
        <div className="grid-x grid-margin-x align-center">
            {/* <button className="button generate" onClick={onClick50} type="button">Générer</button> */}
            {/* <button className="bi-play-circle-fill button generate" onClick={onClick50} type="button" /> */}
            <Parameter className="grid-x-cell" title="Première lettre" options={alphabetOptions} name='firstLetter' />
            <Parameter className="grid-x-cell" title="Longueur" options={sizeOptions} name='length' />
            <button className="grid-x-cell button generate" onClick={onGenerate} type="button">
              Générer
              {/* <i className="bi bi-gear-fill" role="img" aria-label="generate"></i> */}
            </button>
        </div>
      <div className="">
          {words.length 
            ? words.map((word, i) => {
                return (
                  <span key={i}>
                    <input 
                      size={word.length + 2} 
                      className={`tag-word tag-color-${colors[i]}`} 
                      value={word}
                      onClick={() => onClickWord(word)}
                      readOnly>
                    </input>
                    {getHasLikedWords(word) && <span className="badge">
                      <i className="bi bi-heart-fill" role="img" aria-label="like"></i>
                    </span>}
                  </span>
                );
              }
            ) : null
          }
        </div>
    </div>
    
    //     <div className="cell small-12">
    //       <Word word={word} />
    //     </div>
    //     {/* <textarea id="w3review" name="w3review" rows="6" cols="50" value={words} /> */}
    //     {/* <div className="cell small-12">
    //       <Parameter title="Originalité" options={originalityOptions} name='originality' />
    //     </div> */}
    //     {/* <div className="cell small-12 slidecontainer">
    //       <input 
    //         type="range" 
    //         min="1" 
    //         max="100" 
    //         // value="50" 
    //         className="slider" 
    //         id="myRange" 
    //       />
    //     </div> */}
    //     {/* <div className="cell small-12">
    //       <Parameter title="Sonorité" options={sonorityOptions} name='sonority' />
    //     </div> */}
    //     {/* <div className="cell small-12">
    //       <Parameter title="Longueur" options={sizeOptions} name='length' />
    //     </div> */}
       
    //     {/* <div className="cell small-12">
    //       <Parameter title="Language" options={languageOptions} name='language'/>
    //     </div> */}
    //     {/* <div className="cell small-12">
    //       <button onClick={onClick} type="button" className="success button">Générer</button>
    //     </div>
    //     <div className="cell small-12">
    //       <button onClick={onClick50} type="button" className="success button">Générer 50</button>
    //     </div> */}
    //   {/* </div>
    // </form> */}
  );
};

export default Form;
