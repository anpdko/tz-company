import React, { useState } from 'react'
import s from './Universities.module.scss'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import axios from 'axios';
import countrys from '../../data/countrys'

const Universities = () => {
   const [inputCountry, setInputCountry] = useState<string>('')

   const getUniversities = async () => {
      console.log(countrys)
      if(inputCountry){
         const res = await axios.get(`http://universities.hipolabs.com/search?country=${inputCountry}`)
         console.log(res.data)
      }
      else {
         alert('Please fill in all fields')
      }
   }

   return (
      <div className={s.universities}>
         <div className={s.control}>
            <Input 
               placeholder='country...'
               value={inputCountry}
               setValue={setInputCountry}
               list={countrys}
            ><i className="bi bi-globe-europe-africa"></i></Input>
            <Button onClick={getUniversities}>SEND</Button>
            <Button>RESET</Button>
         </div>
         <div className={s.list_university}>
            <div className={s.item}>

            </div>
         </div>
      </div>
   );
};
export default Universities