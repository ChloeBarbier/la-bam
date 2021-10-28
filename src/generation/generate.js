import { generateWord } from './tools';
import { generateMatriceSimple3D_v2} from './brain';

const generate = (parameters, dictionary) => {
  const { originality, firstLetter, length, list } = parameters;

  // console.log("originality", originality)

  // remplacer -dictionary- par -list-

  const matriceSimple3D = generateMatriceSimple3D_v2(dictionary);
  // const matriceSimple3D = generateMatriceSimple3D_v2(list);
  const word = generateWord(matriceSimple3D, originality, firstLetter, length);

  return word;
};

export default generate;