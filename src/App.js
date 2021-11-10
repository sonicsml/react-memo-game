import { useState } from 'react';
import './App.css';

const cardImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"}
]
function App() {
  const [cards, setCards] = useState([])
  const [terns, setTerns] = useState(0)
  // suffle cards
  const suffleCards = () => {
    const suffledCards = [ ...cardImages, ...cardImages ]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    
    setCards(suffledCards)
    setTerns(0)
  }
  console.log(cards, terns)
  return (
    <div className="App">
        <h1>Magic Match</h1>
        <button onClick={suffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map(card => (
            <div className="card" key={card.id}>
              <div>
                <img className="fort" src={card.src} alt="card front" />
                <img className="back" src="img/cover.png" alt="card back" />
              </div>
            </div>
          ))}
        </div>

    </div>
  );
}

export default App;
