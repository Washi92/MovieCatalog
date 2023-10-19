import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from "./search.svg";
import Movies from './components/Movies';

const API_URL = "https://www.omdbapi.com?apikey=38ef56e5";

const App = () =>{

  const searchMovies = async (title, page) => {
  
    const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
    const data = await response.json();

    setMovies(data.Search);
  }
 

  const [movies, setMovies] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("One Piece"); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect( ()=>{
    console.log("Searching page: "+currentPage)
    searchMovies(searchTerm,currentPage);
    
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

  return (
    <div className="app">
      <h1>Pirate Bay</h1>
      <div className="search">
        <input 
          placeholder='Search your movie'
          value={searchTerm}
          onChange={(e)=>{
            setSearchTerm(e.target.value)
          }}/>
        <img src={SearchIcon} alt="search" onClick={()=>{
          setCurrentPage(1);
          searchMovies(searchTerm,currentPage);
        }}/>
      </div>

      {
        movies?.length > 0 ? (
          <div className='container'>
            {
              movies.map( (movie) =>(
                <Movies movie={movie}/>
              ))
            }            
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found...</h2>
          </div>
        )
      }     

      <div className="pagination">
        <button 
        className='button'
        onClick={handlePreviousPage} 
        disabled={currentPage === 1}>Previous</button>
        <h1>{currentPage}</h1>
        <button 
        className='button'
        onClick={handleNextPage}>Next</button>
      </div>

    </div>
  );
}

export default App;
