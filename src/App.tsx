import React, {useState, useEffect,FC} from 'react';
import Options from './components/Options/Options'
import './App.css';
import bg from './assets/image/bg.jpeg'

const App:FC =()=> {

  const [questions, setQuestions] = useState<any>(null)
  const [number, setNumber] = useState<number>(0)
  const [selectedAns, setSelectedAns] = useState<string | null>(null)
  const [correctAnsCount, setCorrectAnsCount] = useState<number>(0)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const[url,setUrl] = useState<string>('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')

  const getData = async (apiUrl: string | null) => {
    if(apiUrl === null) return
    setQuestions(null)
    setNumber(0)
    setSelectedAns("")
    setCorrectAnsCount(0)
    const url: string = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
    const response: any = await fetch(apiUrl)
    const result: any = await response.json()
    const q:any = result.results
    q.forEach( (item:any ,idx:number) => {
      const newAns = [...item.incorrect_answers, item.correct_answer]
      q[idx].answers = newAns.sort(()=> Math.random() - 0.5)
    })
    setQuestions( q )
  } 

  useEffect(()=>{
    getData(url)
  },[url])

  const selectHandle = (e: any)=> {
    console.log( e.target.id)
    if(questions[number].correct_answer.toLowerCase() === e.target.id.toLowerCase() ){
      setCorrectAnsCount( prev => prev + 1)
    }
    setSelectedAns( e.target.innerText )
  }

  const next =()=> {
    if(number+1 >= questions.length) return
    setSelectedAns("")
    setNumber( prev => prev + 1)
  }

  return (
    <div className="App">
      <div className="options" onClick={()=> setShowOptions(!showOptions) }>
          <span>Options</span>
      </div>
      <div className="bg-image">
        <img src={bg} alt="background image" />
      </div>
      <div className="top">
        { questions  && <div className="score">Score: {correctAnsCount} / {questions.length}</div>}
      </div>
      
      <div className="bottom">
        { questions && <div className="question">
          <p> <span style={{"fontStyle": "italic"}}>Question Number: {number + 1}</span> <br/>  <span dangerouslySetInnerHTML={{__html: questions[number].question }}></span>  </p>
        </div>  }
        <div className="answers">
          { questions && questions[number].answers.map( (ans: string) => {
            return selectedAns === "" ? 
              <div className='item' key={ans}><p onClick={(e) => selectHandle(e)} dangerouslySetInnerHTML={{__html: ans}} id={ans}></p></div> : 
              ans.toLowerCase().match(questions[number].correct_answer.toLowerCase()) ? 
              <div className='item' key={ans}><p className='bg-green' dangerouslySetInnerHTML={{__html: ans}}></p></div> : 
              <div className='item' key={ans}><p className='bg-red' dangerouslySetInnerHTML={{__html: ans}}></p></div>  
          })}
        </div>
        { questions && <div className='nav'>
           { number+1 < questions.length ? <button onClick={next} >Next Question</button> : <button onClick={()=> getData(url)}>Play again!</button>}
        </div>}
      </div>
      {showOptions && <Options setShowOptions={setShowOptions} setUrl={setUrl} />}
      <footer>
        <p>Web Developer: Email: <a href="mailto:norvillie.villaruel@edu.sait.ca">norvillie.villaruel@edu.sait.ca</a></p>
      </footer>
    </div>
  );
}

export default App;
