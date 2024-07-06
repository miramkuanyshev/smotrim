import './Slider.css'
import { useEffect, useState, useLayoutEffect} from 'react'
import Card from '../card/card';
import Button from '../../elenents/buttons/buttons';
import Popup from  '../popup/popup';




function Slider() {

  const [items, setItem] = useState([]);
  const [offset, setOffset]  = useState(0);
  const [popupProps, setPopupProps] = useState({ 
    active: false,
    anons: '',
    body: '',
    pictureId:'',
    titleName: '',
    titleSurname:  '',
  });
  const width = window.innerWidth;
  const STEP = 176;
  let minCount  =  Math.floor(width/STEP);
  const TRANSITION_DURATION = 300;
  const [transitionDuration, setTransitionDuration] = useState(TRANSITION_DURATION);
  
  
// Запрос
  useEffect(() => {
      fetch('https://cdnapi.smotrim.ru/api/v1/boxes/vesti2')
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(data => {
            if (!data.data || !data.data.content) {
              throw new Error('Invalid data');
            }
            const content = data.data.content.find(item => item.id === 943);
            if (!content) {
              throw new Error('No item with id 943 found');
            }
            if (content.content.length < minCount)  {
              setItem (Array.from({ length: minCount*2 }, (_, i) => content.content[i % content.content.length]));
            } else {
              setItem (Array.from({ length: content.content.length*2 }, (_, i) => content.content[i % content.content.length]));
            }
          })
          .catch(error => console.log(error));
  }, []);

  //анимация и переключение слайдера

  useEffect(()  =>  {
    if (offset === -(STEP * (items.length - minCount))) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset((-(items.length/2-minCount) * STEP))
      }, TRANSITION_DURATION)
  }})

  useLayoutEffect(() => {
    if (transitionDuration === 0) {
      setTimeout(() => {
        setTransitionDuration(TRANSITION_DURATION)
      }, 200)
    }
  }, [transitionDuration]);



//Навигация

let back = 'back';
let next  =  'next';

if (offset ===  0)  {
  back = 'inactive'
}

const handleBack  =  ()  =>  {
  setOffset(offset + STEP);
}

const handleNext   =  ()   =>  {
  setOffset(offset  - STEP);  
}

//функция открытия модального окна 

const openPopup   =  (id, picId, name, surname)   => {
  fetch(`https://cdnapi.smotrim.ru/api/v1/persons/${id}`)
      .then(response => response.json())
      .then(data => setPopupProps({ 
        active: true, 
        anons: data.data.anons,
        body: data.data.body,
        imgId: picId,
        titleName: name,
        titleSurname: surname
      })
      .catch(error => console.log(error)));
    
  }

  console.log(popupProps)


  return (
    <>
    <section className="slider">
        <div className="slider-container">
          <Button type={back} handelClick = {(event) => event.preventDefault(handleBack())}/>
            <div className="slider-item"
            style={
              {transform: `translateX(${offset}px)`,
              transitionDuration: `${transitionDuration}ms`
            }}
            >                         
              {items.map((item)=> {
                const {picId, name, surname, id} = item
                return  (
                    <Card
                      key={id}
                      pictureId={picId}
                      titleName={name}
                      titleSurname={surname}
                      CardClick={(event) => event.preventDefault(openPopup(id, picId, name, surname))}
                  /> 
                )
              })}
            </div>
            <Button type={next} handelClick = {(event) => event.preventDefault(handleNext())}/>
        </div>
               
    </section>
    <Popup active={popupProps.active} setActive={setPopupProps}  anons={popupProps.anons} body={popupProps.body} imgId={popupProps.imgId} titleName={popupProps.titleName} titleSurname={popupProps.titleSurname}/>
    
    </>
)}


export default Slider