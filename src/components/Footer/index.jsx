import styles from "./index.module.css"
// eslint-disable-next-line react/prop-types
const Footer = ({currentPage, itemsPerPage, pokemonList, handleNext, handlePrevious}) => {
    return (
        <div className={styles.footer_div}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Предыдущая
            </button>
            {/* eslint-disable-next-line react/prop-types */}
            <span>Страница {currentPage} из {Math.ceil(pokemonList.length / itemsPerPage)}</span>
            {/* eslint-disable-next-line react/prop-types */}
            <button onClick={handleNext} disabled={ currentPage === Math.ceil(pokemonList.length / itemsPerPage) }>
                Следущая
            </button>
        </div>
    );
};

export default Footer;