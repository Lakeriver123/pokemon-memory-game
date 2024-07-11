// Helper function to generate a random identifier for Pokemon
const generateIdentifier = () => {
    return Math.floor(Math.random() * 151) + 1;
  };
  
  // Helper function to fetch Pokemon data from API
  const fetchPokemon = (identifier) => {
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${identifier}`;
  
    return fetch(apiURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        throw error;
      });
  };
  
  // Function to fetch 9 new Pokemon data
  export const fetchPokemonData = async () => {
    try {
      let uniquePokemonIds = new Set();
      const fetchedPokemonData = [];
  
      while (fetchedPokemonData.length < 9) {
        const identifier = generateIdentifier();
  
        if (!uniquePokemonIds.has(identifier)) {
          uniquePokemonIds.add(identifier);
          fetchedPokemonData.push(fetchPokemon(identifier));
        }
      }
  
      const resolvedPokemonData = await Promise.all(fetchedPokemonData);
      return resolvedPokemonData;
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      throw error;
    }
  };