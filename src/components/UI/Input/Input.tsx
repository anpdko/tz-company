import React, { useState } from 'react'
import styles from './Input.module.scss'

interface IInput {
   className?: string;
   children?: any;
   type?: string;
   placeholder?: string;
   value: string;
   list?: string[];
   setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ className, value, setValue, children, list, type = 'text', placeholder, ...props }: IInput) => {
   const [filteredList, setFilteredList] = useState<string[]>([])

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      setFilteredList(filteredSuggestions())
   }

   const handleSelect = (value:string) => {
      setValue(value);
      setFilteredList([])
   }

    const filteredSuggestions = ():string[] => {
      if(list?.length && value.length){
         return list.filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
      }
      return []
    }

   return (
      <div className={styles.box_input}>
         <span className={styles.icon}>
            {children}
         </span>

         <input
            placeholder={placeholder}
            style={{ paddingLeft: children ? '3rem' : '20px' }}
            {...props}
            className={`${styles.input} ${className}`}
            type={type}
            onChange={(e) => handleChange(e)}
            value={value}
         />
         
         <ul>
            {!!value.length && filteredList.map((suggestion) => (
                  <li key={suggestion} onClick={() => handleSelect(suggestion)}>
                     {suggestion}
                  </li>
               ))}
         </ul>
      </div>
   );
};

export default Input

