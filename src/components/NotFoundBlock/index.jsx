import styles from'./NotFoundBlock.module.scss'
function NotFoundBlock(){
    return (  
        <div className={styles.root}>
            <h1><span>😕</span><br/>ничего не найдено</h1>
            <p className={styles.description}>К сожалению данная страница отсутствует в нашем интернет магазине</p>
        </div>
    );
}
 
export default NotFoundBlock;