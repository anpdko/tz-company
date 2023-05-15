import React, { useEffect, useState } from 'react'
import s from './Universities.module.scss'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import axios from 'axios';
import countrysData from '../../data/countrys'
import Loader from '../Loader/Loader';

interface IUniversity {
   alpha_two_code: string;
   country: string;
   domains: string[];
   name: string;
   "state-province": null
   web_pages: string[];
   bookmark: boolean
}

const Universities = () => {
   const [universities, setUniversities] = useState<IUniversity[]>([])
   const [inputCountry, setInputCountry] = useState<string>('')
   const [title, setTitle] = useState<string>('')
   const [bookmarks, setBookmarks] = useState<IUniversity[]>([])
   const [loader, setLoader] = useState(false)

   const getUniversities = async () => {
      if (inputCountry) {
         setLoader(true)
         const res = await axios.get(`https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country=${inputCountry}`)
         const data = res.data.slice(0, res.data.length / 2) // Убираем повторяющийся
         setTitle(data[0].country)
         changeUniversitiesBookmark(data)
         setLoader(false)
      }
      else {
         alert('Please fill in all fields')
      }
   }

   const changeBookmark = async (university: IUniversity) => {
      try {
         let newBookmarks = bookmarks

         // Добавление или удаление в localStorage
         if (!isBookmark(bookmarks, university)) {
            newBookmarks.push(university);
         } else {
            newBookmarks = bookmarks.filter((bookmark: IUniversity) => bookmark.name !== university.name)
         }
         setBookmarks(newBookmarks)
         await localStorage.setItem('bookmarkUniversities', JSON.stringify(newBookmarks));

         setUniversities(universities.map((item) => {
            if (item.name === university.name) {
               return { ...university, bookmark: !university.bookmark };
            }
            return item;
         }));
      } catch (error) {
         console.error(error);
      }
   };

   const changeUniversitiesBookmark = (universities: IUniversity[]) => {
      // Добавляем поле bookmark
      setUniversities(universities.map((item: IUniversity) => {
         if (isBookmark(bookmarks, item)) {
            return { ...item, bookmark: true }
         }
         return { ...item, bookmark: false }
      }))
   }


   const showBookmarks = () => {
      setUniversities(bookmarks)
      setTitle('Bookmarks')
      changeUniversitiesBookmark(bookmarks)
   }

   const getBookmarks = () => {
      const bookmarksData = localStorage.getItem('bookmarkUniversities');
      let bookmarks = bookmarksData ? JSON.parse(bookmarksData) : [];
      return Array.isArray(bookmarks) ? bookmarks : [];
   };

   const isBookmark = (bookmarks: IUniversity[], university: IUniversity) => {
      return bookmarks.some((bookmark) => bookmark.name === university.name);
   };

   useEffect(() => {
      const bookmarks = getBookmarks()
      setBookmarks(bookmarks)
   }, [])


   const reset = () => {
      setUniversities([])
      setInputCountry('')
   }

   return (
      <div className={s.universities}>
         <div className={s.control}>
            <div data-count={bookmarks.length} className={s.bookmarks} onClick={showBookmarks}>
               <i className="bi bi-bookmarks-fill"></i>
            </div>
            <Input
               placeholder='country...'
               value={inputCountry}
               setValue={setInputCountry}
               list={countrysData}
            ><i className="bi bi-globe-europe-africa"></i></Input>
            <div className={s.btns}>
               <Button onClick={getUniversities}>SEND</Button>
               <Button onClick={reset}>RESET</Button>
            </div>
         </div>
         {loader
            ? <Loader />
            : <div>
               <h2>{title}</h2>
               <ol className={s.list_university}>
                  {universities.map((university, index) =>
                     <li key={index} className={s.item}>
                        <span className={s.between}>
                           <h3>{university.name}</h3>
                           <a target="_blank" rel="noreferrer" href={university.web_pages[0]}>{university.web_pages[0]}</a>
                           {university.bookmark
                              ? <i onClick={() => changeBookmark(university)} className="bi bi-bookmark-check-fill"></i>
                              : <i onClick={() => changeBookmark(university)} className="bi bi-bookmark-plus"></i>
                           }
                        </span>
                     </li>
                  )}
               </ol>
            </div>
         }
      </div>
   );
};
export default Universities