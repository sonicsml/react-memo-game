import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'
import './App.css'

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]
function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisapbled] = useState(false)

  // suffle cards
  const suffleCards = () => {
    const suffledCards = [ ...cardImages, ...cardImages ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    
    setChoiceTwo(null)
    setChoiceOne(null)
    setCards(suffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => { 
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisapbled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn() 
      } else {
        setTimeout(() => resetTurn(), 1000) 
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & inrease turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisapbled(false)
  }

  // start a new game auto
  useEffect(() => {
    suffleCards()
  }, [])

  return (
    <div className="App">
        <h1>Squid game</h1>
        <button onClick={suffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
