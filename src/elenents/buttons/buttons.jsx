import style from './buttons.module.css';



function Button ({type, handelClick}) {
    



    let condition = style.button
    if (type === 'back') {
        condition = style.back
    } else if (type === 'next') {
        condition = style.next
    } else {
        condition = style.inactive
    }

    return (
        <button className={condition} onClick={handelClick} ></button>
    )
} 

export default Button;