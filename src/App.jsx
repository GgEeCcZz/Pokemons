import Nav from "./components/Nav/index.jsx";
import Header from "./components/Header/index.jsx";
import ListContainer from "./components/ListContainer/index.jsx";
import Footer from "./components/Footer/index.jsx"
import styles from "./App.module.css"
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [selectedColor, setSelectedColor] = useState(null); // Выбранный цвет
    const [pokemonList, setPokemonList] = useState([]); // Список покемонов
    const [loading, setLoading] = useState(false); // Индикатор загрузки
    const [colors, setColors] = useState([]); // Список цветов
    const [currentPage, setCurrentPage] = useState(1); // Текущая страница
    const itemsPerPage = 12


    // Загрузка списка цветов
    const fetchColors = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon-color/')
            const colorsFromApi = response.data.results.map((color) => color.name)
            setColors(colorsFromApi);
        } catch (error) {
            console.error('Ошибка при загрузке цветов:', error)
        }
    }

    // Загрузка списка покемонов указанного цвета
    const fetchPokemonsByColor = async (color) => {

        setLoading(true);

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${color}`);
            const pokemons = response.data.pokemon_species; // Список покемонов
            setPokemonList(pokemons);
            setCurrentPage(1) // Сброс страницы при выборе нового цвета
        } catch (error) {
            console.error('Ошибка при получении покемонов:', error);
        }
        setLoading(false);
    };

    // Отображение полученных цветов с API
    useEffect(() => {
        fetchColors();
    }, [])

    // Загрузка покемонов указанного цвета
    const handleClick = (color) => {
        setSelectedColor(color);
        fetchPokemonsByColor(color);
    };

    // Вычисляем покемонов для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPokemons = pokemonList.slice(startIndex, startIndex + itemsPerPage);

    // Обработчики для кнопок пагинации
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(pokemonList.length / itemsPerPage)) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <>
            <div className={styles.app_container}>
                <div className={styles.app_nav_container}>
                    <Nav colors={colors} selectedColor={selectedColor} handleClick={handleClick}/>
                </div>
                <div className={styles.app_content_container}>
                    <Header/>
                    <ListContainer loading={loading} currentPokemons={currentPokemons} selectedColor={selectedColor}/>
                    <Footer currentPage={currentPage} itemsPerPage={itemsPerPage} pokemonList={pokemonList} handlePrevious={handlePrevious} handleNext={handleNext}/>
                </div>
            </div>
        </>
    )
}

export default App
