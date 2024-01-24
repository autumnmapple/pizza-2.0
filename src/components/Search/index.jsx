import serch from "./icons/serch.svg";
import close from "./icons/close.svg";
import { useContext } from "react";
import { SearchContext } from "../../App";

import styles from "./Search.module.scss";
const Search = () => {
  const {searchValue, setSearchValue}=useContext(SearchContext); /* используем контекст из App */
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={serch} alt="поиск" />{" "}
      {/* https://www.iconfinder.com */}

      {/* сохраняем введеное значение в setSearchValue */}
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)} /* сохраняет в serchValue из хука->записываются изменения в value */
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {/* если что-то введено, то появляется иконка крестика */}
      {searchValue && (
        <img onClick={()=>setSearchValue('')} className={styles.clearIcon} src={close} alt="закрыть" />
      )}
    </div>
  );
};
export default Search;
