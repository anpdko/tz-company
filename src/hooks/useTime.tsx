import { useEffect, useState } from 'react'


const useTime = () => {
   const [date, setDate] = useState(new Date())

   const tick = () => {
      const newData = new Date()
      if(newData !== date) {
         setDate(newData)
      }
   }

   const formatDate = (date: Date) => {
      const dateStr = date.toLocaleDateString("ru-RU");
      const timeStr = date.toLocaleTimeString("ru-RU", {hour: '2-digit', minute:'2-digit'});

      return `${dateStr} ${timeStr}`
   }

   useEffect(()=>{
      const intervalId = setInterval(() => tick(), 1000);

      return () => {
         clearInterval(intervalId)
      }
   })

   return formatDate(date);
};
export default useTime