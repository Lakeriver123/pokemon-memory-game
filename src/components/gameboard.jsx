import { useState, useEffect } from 'react';
import { fetchPokemonData } from './pokemonApi';
import './gameBoard.css'; // Assuming you have styles

function GenerateGameBoard() {
  const [pokemonData, setPokemonData] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [resetGameBoard, setResetGameBoard] = useState(false); // State to trigger game board reset

  useEffect(() => {
    const getPokemonData = async () => {
      const data = await fetchPokemonData();
      setPokemonData(data);
    };

    getPokemonData();
  }, [resetGameBoard]); // Fetch new Pokemon data when resetGameBoard state changes

  const handlePokemonClick = (pokemon) => {
    console.log(`Clicked on ${pokemon.name} (ID: ${pokemon.id})`);

    if (!pickedPokemon.includes(pokemon.id)) {
      setPickedPokemon([...pickedPokemon, pokemon.id]);
      setResetGameBoard(prevState => !prevState); // Toggle resetGameBoard to fetch new Pokemon
      console.log(`Nice memory! You picked a new Pokémon! ${pokemon.name}!`);
      
      // Update current score and high score using functional updates
      setCurrentScore(prevScore => {
        const newScore = prevScore + 1;
        if (newScore > highScore) {
          setHighScore(newScore); // Update high score if new score is higher
        }
        return newScore; // Return updated current score
      });
  
    } else {
      console.log(`You already picked ${pokemon.name}! Your current score has been reset`);
      setCurrentScore(0);
    }
  };

  return (
    <div className='scoreAndPokemonBoardContainer'>
      <p className='score'>Current Score: {currentScore} || High Score: {highScore}</p>
      <div className="pokemonBoard"> 
        {pokemonData.map(pokemon => (
          <div key={pokemon.id} className="pokemonCard">
            <img
              src={pokemon.sprites?.front_default || ''}
              alt={`Image of ${pokemon.name}`}
              className="pokemonImage"
              onClick={() => handlePokemonClick(pokemon)}
            />
            <p className="pokemonName">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenerateGameBoard;
