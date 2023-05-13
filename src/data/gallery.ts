import img1 from '../assets/images/1.jpg'
import img2 from '../assets/images/2.jpg'
import img3 from '../assets/images/3.jpg'
import img4 from '../assets/images/4.jpg'
import img5 from '../assets/images/5.jpg'
import img6 from '../assets/images/6.jpg'
import img7 from '../assets/images/7.jpg'
import img8 from '../assets/images/8.jpg'
import img9 from '../assets/images/9.jpg'
import img10 from '../assets/images/10.jpg'
import img11 from '../assets/images/11.jpg'
import img12 from '../assets/images/12.jpg'

interface IObjGallery {
   id: number,
   img: string
}

const galleryData:IObjGallery[] = [
   {id: 1, img: img1},
   {id: 2, img: img2},
   {id: 3,img: img3},
   {id: 4,img: img4},
   {id: 5,img: img5},
   {id: 6,img: img6},
   {id: 7,img: img7},
   {id: 8,img: img8},
   {id: 9,img: img9},
   {id: 10,img: img10},
   {id: 11,img: img11},
   {id: 12,img: img12},
]

export default galleryData