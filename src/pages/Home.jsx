/* raf+tab */
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import {setCategoryId} from "../redux/slices/filterSlice"

import Cartegories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/pizzaBlock"; //если файл называется индекс => в пути можно его не
import Sceleton from "../components/pizzaBlock/Sceleton";
import Pagination from "../Pagination";
import { SearchContext } from "../App";
import { useContext } from "react";

function Home() {
  const dispatch = useDispatch();
  const categoryId=useSelector((state)=>state.filter.categoryId);//дай нам стейт и возвращаем, то что хотим конкретно вытащить в categoryId 

  const {searchValue}=useContext(SearchContext);
  
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoadind] = useState(true);
  /* const [categoryId, setCategoryId] = useState(0); */ /* [категория, функция для изменения категории] */
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  
  const onChangeCategory=(id)=>{
    dispatch(setCategoryId(id)); //нам нужно изменить категорию, которая идет из id
  };

  useEffect(() => {
    /* useEffect будет вызывать функцию, если произойдет какой-то эффект */
    setIsLoadind(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category =
      categoryId > 0
        ? `category=${categoryId}`
        : ""; /*если categoryId>0 => продолжить запрос строкой - category=${categoryId}*/
    const search = searchValue ? `&search=${searchValue}` : "";
    fetch(
      /* в мокапи можно отслеживать изменения https://6576047b0febac18d40396c2.mockapi.io/items?category=5 сортровка по категории + ?page=${currentPage}&limit=4& для пагинации(постраничного вывода и лимит по количеству пицц на старнице) */
      `https://6576047b0febac18d40396c2.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr); /* рендерит пиццы */
        setIsLoadind(false); /*завершение загрузки => убирается скелетон */
      }); /* отправляет запрос на сервер mockAPI, then-когда будет запрос переконвентируй его в json и затем верни мне ответ в arr  */
    window.scrollTo(0, 0); /* скролл наверх при первом открытии сайта */
  }, [
    categoryId,
    sortType,
    searchValue,
    currentPage,
  ]); /* пустой массив для useEffect=>нужно вызвать функия 1 раз; если меняется categoryId, sortType => делаем запрос на бек*/

  const pizzas = items.map((object) => (
    <PizzaBlock key={object.id} {...object} />
  ));

  /*способ фильтрации  
  const pizzas = items 
    .filter((object) => { если название пиццы совпадает с введенными в поиск=>выводим true + переводим всё в нижний регистр, чтобы изюежать проблемы, когда пользователь вводит в разных регистрах
    if (object.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  })
  и уже из отфильтрованных объектов выведи пиццы 
  .map((object) => <PizzaBlock key={object.id} {...object} />);  */

  /* или таким способом, если нужно передать определенные значения
  items.map((object) => (
    <PizzaBlock
      key={object.id}
      title={object.title}
      price={object.price}
      imageUrl={object.imageUrl}
      sizes={object.sizes}
      types={object.types}
    />
  )) */

  const sceletons = [...new Array(6)].map((_, index) => (
    <Sceleton
      key={index}
    /> /* каждый раз при использовании списка создавать ключ */
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Cartegories
          value={categoryId}
          onChangeCategory={onChangeCategory} //раньше было {(id)=>setCategoryId(id)-вариант без редакса}
        />
        {/*в эту функцию (id)=>setCategoryId(id) передается Categories index на  место id, а вызывается с помощью setCategoryId(id)*/}
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />{" "}
        {/*value-значение сортировки(берется из хука); onChangeSort-функция, которая меняет сортировку*/}
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading /* если идет загрузка, то создай массив из 6 элементов и помести туда скелетон, иначе создай пиццы */
          ? sceletons
          : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
export default Home;
