import React, {useEffect, useState} from 'react';
import { QUESTIONS } from '../questions';

const Question = (getTotalScore) => {
    const [ questionsArr, SetQuestionsArr ] = useState([]); 
    const [ answerset, setAnswerset ] = useState([]);
    const [ totalScore, setTotalScore ] = useState(0);
    const [ averageScore, setAverageScore ] = useState(0);

    useEffect(() => {
        const questionSet = []
        for (let key in QUESTIONS) {
            questionSet.push(QUESTIONS[key])
          }
        SetQuestionsArr(questionSet);
        const scoreData = JSON.parse(localStorage.getItem("averageScore")) || {}
        setAverageScore(scoreData.averageScore);
    },[totalScore])

    const handleRadio = (event) => {
        const { name, value } = event.target
        const isPublished = value === 'true' ? true : false;
        const id = name;
        setAnswerset({...answerset, [id]:isPublished });
    }

     const SetAverageScore = (totalCalculatedScore) => {
                const scoreData = JSON.parse(localStorage.getItem("averageScore")) || { averageScore : totalCalculatedScore, scoreCount: 0 }
                const updatedScoreCount = scoreData.scoreCount + 1;
                const updatedAverageScore = (averageScore + totalCalculatedScore) / updatedScoreCount;
                const dataKey = {
                    "averageScore" : updatedAverageScore,
                    "scoreCount" : updatedScoreCount
                }
                localStorage.setItem("averageScore", JSON.stringify(dataKey));
     } 

     const handleSubmit = async (event) => {
            event.preventDefault();
            let totalYesAnswers = 0
            for (let key in answerset) {
                if(answerset[key] === true){
                    totalYesAnswers++;
                }
              }
            const totalScore = 100 * totalYesAnswers / Object.keys(answerset).length;
            await setTotalScore(totalScore);
            SetAverageScore(totalScore);
        }

    return (
            <form onSubmit={''}>
            {questionsArr.map((question, i) => 
            <div className="question">
                <span>{question}</span>
                <span>
                  <label>
                    <input 
                      type="radio" 
                      name={`Question${i}`}
                      value={true}
                      checked={answerset[`Question${i}`] === true}
                      onChange={handleRadio} />
                    Yes
                  </label>
               </span>
               <span>
                 <label>
                   <input 
                     type="radio" 
                     value={false}
                     name={`Question${i}`} 
                     checked={answerset[`Question${i}`] === false}
                     onChange={handleRadio} />
                   No
                 </label>
               </span>
                </div>
            )}
            <button type="submit" className="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
            <div className= "assessment" >Your assessment score is {totalScore}</div>
            <div className= "assessment" >Average assessment score is {averageScore}</div>
            </form>
    );
};

export default Question;