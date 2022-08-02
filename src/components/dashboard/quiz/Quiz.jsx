import React, { useState } from 'react';
// import Header from '../../header/Header';
// import './quiz.css';

export default function Quiz() {
	const questions = [
		{
			question: 'What is the capital of France?',
			answerOptions: [
				{ answer: 'New York', isCorrect: false },
				{ answer: 'London', isCorrect: false },
				{ answer: 'Paris', isCorrect: true },
				{ answer: 'Dublin', isCorrect: false },
			],
		},
		{
			question: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answer: 'Jeff Bezos', isCorrect: false },
				{ answer: 'Elon Musk', isCorrect: true },
				{ answer: 'Bill Gates', isCorrect: false },
				{ answer: 'Tony Stark', isCorrect: false },
			],
		},
		{
			question: 'The iPhone was created by which company?',
			answerOptions: [
				{ answer: 'Apple', isCorrect: true },
				{ answer: 'Intel', isCorrect: false },
				{ answer: 'Amazon', isCorrect: false },
				{ answer: 'Microsoft', isCorrect: false },
			],
		},
		{
			question: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answer: '1', isCorrect: false },
				{ answer: '4', isCorrect: false },
				{ answer: '6', isCorrect: false },
				{ answer: '7', isCorrect: true },
			],
		},
	];
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const handleAnswerButtonClick= (isCorrect) => {
        if(isCorrect)
        {
            setScore(score+1);
        }
        const nextQuestion = currentQuestion + 1;
        if(nextQuestion < questions.length)
        {
            setCurrentQuestion(nextQuestion);
        }
        else{
            setShowScore(true);
        }
    }
	return (
        <>
        {/* <Header/> */}
		<div className='quiz-app'>
			{/* HINT: replace "false" with logic to display the 
      score when the user has answered all the questions */}
			{showScore ? (
				<div className='quiz-score-section'>You scored {score} out of {questions.length}</div>
			) : (
				<>
					<div className='quiz-question-section'>
						<div className='quiz-question-count'>
							<span>Question {currentQuestion+1}</span>/{questions.length}
						</div>
						<div className='quiz-question-text'>{questions[currentQuestion].question}</div>
					</div>
					<div className='quiz-answer-section'>
						{questions[currentQuestion].answerOptions.map((item, index)=>(
                            <button onClick={() => handleAnswerButtonClick(item.isCorrect)}>{item.answer}</button>
                        ))}
					</div>
				</>
			)}
		</div>
        </>
	);
}
