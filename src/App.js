import { useState } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';
import Card from './components/Card';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [queryKey, setQueryKey] = useState('list');

  // ポケモン一覧を取得するuseInfiniteQuery
  const {
    data: pokemonList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['pokemonList', queryKey],
    queryFn: ({ pageParam = url }) => getAllPokemon(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next || undefined;
    },
  });

  // ポケモン一覧を表示
  const pokeList = () => {
    setUrl('https://pokeapi.co/api/v2/pokemon');
    setQueryKey('list');
  };

  // アビリティ一覧を表示
  const pokeAbility = () => {
    setUrl('https://pokeapi.co/api/v2/ability');
    setQueryKey('ability');
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (isError) {
    return <div className="App">Error! {error.toString()}</div>;
  }

  // ポケモンデータの表示
  return (
    <div className="App">
      <>
        <div style={{ margin: '30px' }}>
          <button style={{ marginRight: '20px' }} onClick={() => pokeList()}>
            ポケモンリスト
          </button>
          <button onClick={() => pokeAbility()}>アビリティリスト</button>
        </div>

        {/* 各ポケモンの表示 */}
        <InfiniteScroll
          loadMore={() => {
            if (!isFetching) {
              fetchNextPage();
            }
          }}
          hasMore={hasNextPage}
        >
          {pokemonList.pages.map((pageData) => {
            return pageData.results.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            });
          })}
        </InfiniteScroll>
        {isFetching && <div style={{ margin: '50px' }}>Loading...</div>}
      </>
    </div>
  );
}

export default App;
