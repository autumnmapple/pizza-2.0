import "./scss/app.scss";
import { createContext} from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

export const SearchContext=createContext(''); /* экспорт для дальнейшего импорта в Search */

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}> {/* компонентам внутри передаем данные сразу, чтоб не передавать с начала в Header потом в Search(react context)*/}
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>{" "}
            {/* *-если не один из роутов не подходит, то выводим этот*/}
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}
export default App;
