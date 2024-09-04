import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';

const images = [
  {"src": "/images/helmet-1.png", matched: false},
  {"src": "/images/potion-1.png", matched: false},
  {"src": "/images/ring-1.png", matched: false},
  {"src": "/images/scroll-1.png", matched: false},
  {"src": "/images/shield-1.png", matched: false},
  {"src": "/images/sword-1.png", matched: false},
]

function App() {
  
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [... images, ...images]
      .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    if(choiceOne && (choiceOne.src === choiceTwo.src)){
      setDisabled(true);
      setCards(prevCards => {
        return prevCards.map(card => {
          if(card.src === choiceOne.src){
            return {...card, matched: true};
          }else{
            return  card
          }
        })
      })

      setTimeout(() => {
        resetCards()
      }, 1000);
     
    }
    else if (choiceOne && (choiceOne.src !== choiceTwo.src)){
      setDisabled(true);

      setTimeout(() => {
        resetCards()
      }, 1000);
    }
  }, [choiceTwo])

  const resetCards = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1);
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            card={card} 
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
