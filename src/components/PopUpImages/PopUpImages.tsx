import React, { useRef, useEffect } from 'react'
import s from './PopUpImages.module.scss'
import gsap from 'gsap'

interface IPopUpImages {
   img: string | null,
   setImg: React.Dispatch<React.SetStateAction<string | null>>
}

const PopUpImages = ({ img, setImg }: IPopUpImages) => {
   const boxRef = useRef(null)
   const backgroundRef = useRef(null)

   useEffect(() => {
      if (boxRef.current) {
         gsap.set(boxRef.current, { autoAlpha: 0, scale: 0.5, y: -100 })
         gsap.to(boxRef.current, { duration: 0.4, autoAlpha: 1, scale: 1, y: 0 })
         gsap.to(backgroundRef.current, { duration: 0.2, background: 'rgba(0, 0, 0, 0.7)' })
      }
   }, [img])

   const close = () => {
      gsap.to(backgroundRef.current, {
         background: 'rgba(0, 0, 0, 0.0)',
         duration: 0.2, 
      })
      gsap.to(boxRef.current, { 
         duration: 0.3, 
         autoAlpha: 0, 
         scale: 0.8,
         onComplete: () => {
            setImg(null)
         }
      })
   }

   if (!img) {
      document.body.style.overflow = "auto";
      return <div></div>
   }
   else {
      document.body.style.overflow = "hidden";
   }

   return (
      <div className={s.background} onClick={close} ref={backgroundRef}>
         <div className={s.box} ref={boxRef} onClick={(e) => e.stopPropagation()}>
            <div className={s.btns}>
               <i className="bi bi-x-lg" onClick={close}></i>
            </div>
            <img src={img} alt="PopUpImages" />
         </div>
      </div>
   );
};
export default PopUpImages