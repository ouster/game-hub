import { Grid, GridItem, Show } from '@chakra-ui/react';
import './App.css';
import NavBar from './components/NavBar';
import GameGrid from './components/GameGrid';
import GenreList from './components/GenreList';
import { Genre } from './hooks/useGenres';
import { useState } from 'react';
import PlatformSelector from './components/PlatformSelector';
import { Platform } from './hooks/useGames';

function App() {
  const [selectGenre, setSelectGenre] = useState<Genre | null>(null);

  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={selectGenre}
            onSelectGenre={(genre) => setSelectGenre(genre)}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <PlatformSelector
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(selectedPlatform) =>
            setSelectedPlatform(selectedPlatform)
          }
        />
        <GameGrid
          selectedPlatform={selectedPlatform}
          selectedGenre={selectGenre}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
