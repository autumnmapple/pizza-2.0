//rfc для создания компонента
function Cartegories({value, onChangeCategory}) {/* value передает индекс */
  const categories=['Все','Мясные','Вегетарианские','Гриль','Острые','Микс']
  /* const onClickCategory=(index)=>{//присваиваем значения от 0 до 5 и затем передаем в index
    setActiveIndex(index)
  } */
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index)=>(/*  если маcсив меняется, то нельзя передавать в key index */
            <li key={index} onClick={()=>onChangeCategory(index)} className={value===index ? 'active' : ''}>{categoryName}</li>
        ))}  
      </ul>
    </div>
  );
}
export default Cartegories;
