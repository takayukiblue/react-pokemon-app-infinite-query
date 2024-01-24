// ポケモン一覧の取得
export const getAllPokemon = async (url, offset = 0) => {
  try {
    // 一覧取得
    const response = await fetch(`${url}`);
    const data = await response.json();

    console.log(data);

    // 一覧から詳細データを取得
    let _pokemonData = await Promise.all(
      data.results.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

    console.log(_pokemonData);

    // 一覧データに詳細データを組み合わせる
    const details = data.results.map((pokemon, i) => {
      return { ...pokemon, detail: _pokemonData[i] };
    });

    data.results = details;

    return data;
  } catch (error) {
    throw error;
  }
};

// ポケモンの詳細データ取得
const getPokemon = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
