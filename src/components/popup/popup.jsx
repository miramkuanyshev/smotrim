import './popup.css'

function Popup({active, setActive, imgId, anons, body, titleName, titleSurname}) {

    return (
        <div className={active ? 'popup active' : 'popup'} onClick={()=>setActive(false)}>
            <div className="popup__content information" onClick={event => event.stopPropagation()}>
                <div className="information">
                    <div className="information-header">
                        <img className='information-header__photo' src={`https://api.smotrim.ru/api/v1/pictures/${imgId}/bq/redirect`} alt="Фото персоны" />
                        <h2 className="information-header__title title">
                            <span className='title__elem'>{titleName}</span>
                            <span className='title__elem'>{titleSurname}</span>
                        </h2>
                        <span onClick={()=>setActive(false)} className='information-header__button'></span>
                    </div>
                    <span className='information-anons' dangerouslySetInnerHTML={{__html: anons}}/>
                    <span className='information-body' dangerouslySetInnerHTML={{__html: body}}/>
                </div>

            </div>
        </div>

    );
}

export default Popup;