import React, { useEffect, useState } from 'react'

function Test() {

    

    const [data, setData] = useState([]);
     
     useEffect(() => { 
      const fetchData = async () => {
         
            
        const response = await fetch('https://odine-sport.com/api/user');
        
        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log("helllo " , data)
        }
      
    };   // kol mtsyr action jdida
        fetchData();
      }, []);
    


      
 
    return (
    <>
    
    <div>
    {data.map((value, index) => (
        <div key={index}>
          <h2 className='bg-rose-600 shadow-xl shadow-black'>{value.nom}</h2>
          <p>{value.prenom }</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default Test