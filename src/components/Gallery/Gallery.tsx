import React, { useState } from 'react'
import s from './Gallery.module.scss'
import galleryData from '../../data/gallery'
import useTime from '../../hooks/useTime'
import PopUpImages from '../PopUpImages/PopUpImages'


const Gallery = () => {
   const [gallery] = useState(galleryData)
   const [activeImg, setActiveImg] = useState<string | null>(null)
   const time = useTime()

   return (
      <div className={s.container_gallery}>
         <PopUpImages img={activeImg} setImg={setActiveImg}/>
         <div className={s.box_info}>
            <h3>Images: {gallery.length}</h3>
            <h3>{time}</h3>
         </div>
         <div className={s.gallery}>
            {gallery.map(item =>
               <div key={item.id} className={s.box_img}>
                  <img onClick={()=>setActiveImg(item.img)} src={item.img} alt="img" />
               </div>
            )}
         </div>
      </div>
   );
};
export default Gallery