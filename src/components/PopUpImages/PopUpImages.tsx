import React from 'react'
import s from './PopUpImages.module.scss'

interface IPopUpImages {
   img: string | null,
   setImg: React.Dispatch<React.SetStateAction<string | null>>
 }

const PopUpImages = ({img, setImg}:IPopUpImages) => {
   
   const close = () => {
      setImg(null)
   }

   if(!img) {
      document.body.style.overflow = "auto";
      return <div></div>
   }
   else {
      document.body.style.overflow = "hidden";
   }

   return (
      <div className={s.background} onClick={close}>
         <div className={s.box} onClick={(e)=>e.stopPropagation()}>
            <div className={s.btns}>
               <i className="bi bi-x-lg" onClick={close}></i>
            </div>
            <img src={img} alt="PopUpImages"/>
         </div>
      </div>
   );
};
export default PopUpImages