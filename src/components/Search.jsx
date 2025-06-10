import React from 'react'
//never mutate props nor state always mutate it with setstate
//props are read only
function Search({searchTerm,setSearchTerm}) {
    console.log(searchTerm);
  return (
    <div className='search'>
        <div>
            <img src='search.svg' alt='search'></img>
            <input type='text' placeholder='Search through thousands of movies' value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}></input>
        </div>
    </div>
  )
}


export default Search