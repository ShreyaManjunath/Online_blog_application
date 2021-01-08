import React from 'react';
import Posts from '../post/Post';
import '../index.css'
// jumbotron
const  Home = () => (
    <div className="body1">
        <div className="start">
        <h2 className="navbar_active">MINDSPACE</h2>
            <p className="navbar_item subtitle"> Welcome to Blogging site!!! </p>
            
    </div>
    
    <div className="container">
    
        <Posts />
        </div>
    </div>
    // {/* <Footer /> */}
    // </div>
    
    
);

export default Home;
