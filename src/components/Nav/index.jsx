import styles from "./index.module.css"
// eslint-disable-next-line react/prop-types
const Nav = ({colors, selectedColor, handleClick}) => {


    return (
        <div>
            <h2 className={styles.pokemon_color}>Цвет покемона</h2>
            <ul className={styles.ul}>
                {/* eslint-disable-next-line react/prop-types */}
                {colors.map((color) => (
                    <li key={color} className={styles.li}>
                        <button
                            className={selectedColor === color ? 'active' : ''}
                            onClick={() => handleClick(color)}
                        >
                            {color}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Nav;