
import './Card.css'

function Card({titleName, titleSurname, pictureId, CardClick}) {
   

  return (
    <>
        <div className="card" onClick={CardClick}> 
        <div className="card-img">
            <img className='card-img__item' src={`https://api.smotrim.ru/api/v1/pictures/${pictureId}/bq/redirect`} alt="Фото персоны" />
        </div>
        <div className="card-title">
            <span className="card-title__element">{titleName}</span>
            <span className="card-title__element">{titleSurname}</span>
        </div>
    </div>
    </>
  )
}

export default Card