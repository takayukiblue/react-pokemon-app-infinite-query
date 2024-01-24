import React from 'react';

const Card = ({ pokemon }) => {
  return (
    <div className="card" style={{ marginTop: '50px' }}>
      <div className="cardImg">
        {!pokemon.detail.sprites ? (
          <></>
        ) : (
          <img src={pokemon.detail.sprites.front_default} alt="" />
        )}
      </div>
      name: {pokemon.name}
      <br />
      {!pokemon.detail.weight ? <></> : <>weight: {pokemon.detail.weight}</>}
    </div>
  );
};

export default Card;
