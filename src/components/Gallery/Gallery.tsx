import React, { useState, useEffect } from 'react'
import s from './Gallery.module.scss'
import galleryData, {IObjGallery} from '../../data/gallery'
import useTime from '../../hooks/useTime'
import PopUpImages from '../PopUpImages/PopUpImages'
import Button from '../UI/Button/Button'


const Gallery = () => {
   const [gallery, setGallery] = useState<IObjGallery[]>([])
   const [activeImg, setActiveImg] = useState<string | null>(null)
   const time = useTime()

   const deleteGalleryImg = (id:number) => {
      const filterGallery = gallery.filter(item => item.id !== id)
      setGallery(filterGallery)
      localStorage.setItem('gallery', JSON.stringify(filterGallery))
   }

   useEffect(() => {
      const dataLocalStorage = localStorage.getItem('gallery')
      if(dataLocalStorage?.length) {
         setGallery(JSON.parse(dataLocalStorage))
      }
      else {
         setGallery(galleryData)
      }
   }, [])

   return (
      <div className={s.container_gallery}>
         <PopUpImages img={activeImg} setImg={setActiveImg} />
         <div className={s.box_info}>
            <div className={s.box}>
               <h3>Images: {gallery.length}</h3>
            </div>
            <div className={s.box}>
               <h3>{time}</h3>
            </div>
         </div>
         <div className={s.gallery}>
            {gallery.map(item =>
               <div key={item.id} className={s.box_img}>
                  <img onClick={() => setActiveImg(item.img)} src={item.img} alt="img" />
                  <div className={s.btn_delete} onClick={() => deleteGalleryImg(item.id)}>
                     <i className="bi bi-x-lg"></i>
                  </div>

               </div>
            )}
         </div>
         <div className={s.btns}>
            <Button onClick={() => setGallery(galleryData)}>RESTORE</Button>
         </div>
      </div>
   );
};
export default Gallery