import React, { useRef, useState } from 'react'
import './home.css'
import data from  '../Data/db.json'

function Home() {

    const [index,setIndex]=useState(0)
    const[question,setQuestion]=useState(data[index])
    const[lock,setLock]=useState(false)
    const[score,setScore]=useState(0)
    const[result,setResult]=useState(false)

    let Option1=useRef(null)
    let Option2=useRef(null)
    let Option3=useRef(null)
    let Option4=useRef(null)

    let optionArray=[Option1,Option2,Option3,Option4]

    const verifyAnswer=(e,answer)=>{
        if(lock===false){
        if (question.answer==answer) {
            e.target.classList.add("correct")
            setLock(true)
            setScore(prev=>prev+1)
        } else {
            e.target.classList.add("wrong")
            setLock(true)
            setTimeout(()=>{

                optionArray[question.answer-1].current.classList.add("correct")
            },500)

        }            
        }

    }
    const nextButton=()=>{
        if (lock===true) {
            if(index==data.length-1){
                setResult(true)
                return 0
            }
            setIndex(index+1)
            setQuestion(data[index+1])
            setLock(false)
            optionArray.map((option)=>{
                option.current.classList.remove("correct")
                option.current.classList.remove("wrong")
            })
        }
    }
    const resetButton=()=>{
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setResult(false)
        setLock(false)
    }

  return (
    <>
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result?<>
                <h2>You Scored {score} out of {data.length} </h2>
                <button onClick={resetButton}>Reset</button>
            </>:<>
            <h4>{index+1}. {question.question}</h4>
            {/* <span>score:{score}</span> */}
            <ul>
                <li ref={Option1} onClick={(e)=>{verifyAnswer(e,1)}}>{question.option1}</li>
                <li ref={Option2} onClick={(e)=>{verifyAnswer(e,2)}}>{question.option2}</li>
                <li ref={Option3} onClick={(e)=>{verifyAnswer(e,3)}}>{question.option3}</li>
                <li ref={Option4} onClick={(e)=>{verifyAnswer(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={nextButton}>Next</button>
            <div className="index">
                {index+1} of {data.length} questions
            </div>
            </>}
            
            

        </div>
    </>
  )
}

export default Home