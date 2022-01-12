import React from 'react';
import { Context } from './config/state.manager';
// import Word from './Word';
import Parameter from './Parameter';
import generate from './generation/generate';
import { setAuthUser, setWordStatus } from './config/state.dispatch';
import { sizeOptions, listOptions, alphabetOptions } from './constants';

const Form = ({ user }) => {
  const { state, dispatch } = React.useContext(Context);
  const { parameters, lists, likedWords } = state;
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
    newWords.forEach((word, i) => colorsArray.push(Math.floor(Math.random() * 10)));
    setWords(newWords);
    setColors(colorsArray);
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
    setAuthUser(dispatch, user)
  }, [user, dispatch])

  React.useEffect(() => {
    console.log("likedWords changed", Object.keys(likedWords).length)
  }, [likedWords])

  const getHasLikedWords = (word) => {
    console.log(Object.keys(likedWords).length > 0, likedWords[word] !== undefined)
    return Object.keys(likedWords).length > 0 && likedWords[word] !== undefined;
  }

  console.log()

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
                      onClick={() => setWordStatus(dispatch, likedWords, word)}
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
