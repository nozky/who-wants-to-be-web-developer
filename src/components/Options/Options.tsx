import React,{FC} from 'react';
import './options.css'
import { category } from '../../data/category';
import { difficulty } from '../../data/difficulty';
import { types } from '../../data/types';

interface Props {
  setShowOptions: ( show: boolean  |  ((prevShow:boolean) => boolean) ) => void;
  setUrl: (url: string | ((prevUrl:string) => string) ) => void; 
}

const Options: FC<Props> = ({setShowOptions, setUrl}) => {

  const submitHandle = (event: React.SyntheticEvent<HTMLFormElement>):void => {
    event.preventDefault()
    const form = event.currentTarget
    const formElements = form.elements as typeof form.elements & {
      numberQuestions: {value: number},
      category: { value: string },
      difficulty: {value: string },
      type: {value: string}
    }

    interface optionsInterface {
      number: number;
      category: string;
      difficulty: string;
      type: string;
    }

    const optionsObj: optionsInterface = {
      number: formElements.numberQuestions.value,
      category: formElements.category.value,
      difficulty: formElements.difficulty.value,
      type: formElements.type.value
    }

    // api: // https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
    //compose url
    let fDifficulty = optionsObj.difficulty === "any" ? "" : `&difficulty=${optionsObj.difficulty}`
    let fType = optionsObj.type === "any" ? "" : `&type=${optionsObj.type}`
    let url: string = `https://opentdb.com/api.php?amount=${optionsObj.number}&category=${optionsObj.category}${fType}`
    console.log( url )
    setUrl(url)
    setShowOptions(false)
  }

return(
  <div className='game-opt'>
    <div className='select'>
      <h2>Options</h2>
         
      <form className='wrapper' onSubmit={submitHandle}>
            <div className="form-control">
                <label htmlFor="">Number of Questions:</label>
                <input type="number" id='numberQuestions' placeholder='0' defaultValue="10" min="0"/>
              </div> 
            
              <div className="form-control">
                <label htmlFor="">Category:</label>
                <select name="category" id="category">
                  { category.map( item => <option key={item.catNo} value={item.catNo}>{ item.name }</option>)}
                </select>
              </div>

              <div className="form-control">
                <label htmlFor="difficulty">Difficulty</label>
                <select name="difficulty" id="difficulty">
                  { difficulty.map( (item,idx) =>  <option key={idx} value={item}>{item}</option>) }
                </select>
              </div> 

              <div className="form-control">
                <label htmlFor="type">Type</label>
                <select name="type" id="type">
                  { Object.entries(types).map( ( item,idx ) => <option key={idx} value={item[0]}>{item[1]}</option> )}
                </select>
              </div>

              <div className="btns">
                <button type='submit'>Ok</button>
                <button onClick={()=> setShowOptions(false)}>Close</button>
              </div>
        </form>
      
    </div>

  </div>
  );
};

export default Options;
