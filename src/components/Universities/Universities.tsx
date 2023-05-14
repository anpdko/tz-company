import React, { useState, useEffect } from 'react'
import s from './Universities.module.scss'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import axios from 'axios';
import countrysData from '../../data/countrys'

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

   const getUniversities = async () => {
      if (inputCountry) {
         const res = await axios.get(`http://universities.hipolabs.com/search?country=${inputCountry}`)
         setUniversities(res.data.map((item:IUniversity) => {return {...item, bookmark: false}}))
      }
      else {
         alert('Please fill in all fields')
      }
   }

   const changeBookmark = (name:string) => {
      setUniversities(universities.map((university) => {
         if(university.name === name) {
            return { ...university, bookmark: !university.bookmark}
         }
         return university
      }))
   }

   const reset = () => {
      setUniversities([])
      setInputCountry('')
   }

   useEffect(() => {
      console.log(universities)
   }, [universities])

   return (
      <div className={s.universities}>
         <div className={s.control}>
            <Input
               placeholder='country...'
               value={inputCountry}
               setValue={setInputCountry}
               list={countrysData}
            ><i className="bi bi-globe-europe-africa"></i></Input>
            <Button onClick={getUniversities}>SEND</Button>
            <Button onClick={reset}>RESET</Button>
         </div>
         <ol className={s.list_university}>
            {universities.map((university, index) =>
               <li key={index} className={s.item}>
                  <span className={s.between}>
                     <h3>{university.name}</h3>
                     <span className={s.right_box}>
                        <a target="_blank" rel="noreferrer" href={university.web_pages[0]}>{university.web_pages[0]}</a>
                        {university.bookmark
                        ? <i onClick={()=>changeBookmark(university.name)} className="bi bi-bookmark-check-fill"></i>
                        : <i onClick={()=>changeBookmark(university.name)} className="bi bi-bookmark-plus"></i>
                        }
                     </span>
                  </span>
               </li>
            )}
         </ol>
      </div>
   );
};
export default Universities