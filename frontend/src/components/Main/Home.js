import React from 'react'
import { Link, useHistory } from 'react-router-dom';

 const Home = () =>{
  return (
    <div>
       <h1>Home</h1> 
       <Link to="/signup">Sign up</Link>
    </div>
  )
}
export default Home