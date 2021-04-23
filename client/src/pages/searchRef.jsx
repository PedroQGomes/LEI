import React,{useState} from 'react'

const SearchRef = () => {
    const [referencia, setreferencia] = useState("")
    return (
    <input 
     key="random1"
     value={referencia}
     placeholder="Pesquisa por referencia"
     onChange={(e) => setreferencia(e.target.value)}
    />
  );
}

export default SearchRef


