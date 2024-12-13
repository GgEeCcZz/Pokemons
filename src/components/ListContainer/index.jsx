// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from "./index.module.css"

// eslint-disable-next-line react/prop-types
const ListContainer = ({loading, currentPokemons, selectedColor}) => {
    return (
        <div>
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div>
                    <h2>Покемоны цвета {selectedColor}:</h2>
                    <ul className={styles.ul}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {currentPokemons.map((pokemon) => (
                            <li key={pokemon.name} className={styles.li}>{pokemon.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ListContainer;