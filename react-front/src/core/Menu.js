import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth';

const isActive = (history,path) =>{
    if(history.location.pathname === path) return { color:"#ff9900"};
    else return { color:"#ffffff"};
};




const Menu = ({history}) =>(
    <div>
        <ul className="nav nav-tabs bg-dark"> 
            <li className="nav-item">
            <Link className="nav-link" 
            style={isActive(history,'/')} to='/'>Home</Link>
            </li>

            <li className="nav-item">
            <Link className="nav-link" 
            style={isActive(history,'/users')} to='/users'>Users</Link>
            </li>

            <li className="nav-item">
            
            <Link className="nav-link" 
            style={isActive(history,`/post/create`,{color:"#ffff"})}
             to={`/post/create`}>
            Create Post
            </Link>
            
            </li>


            {!isAuthenticated() && (
                <>
                <li className="nav-item">
            <Link className="nav-link" 
            style={isActive(history,'/signin')} to='/signin'>Sign In</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" 
            style={isActive(history,'/signup')} to='/signup'>Sign Up</Link>
            </li>
            </>
            ) }
            
            {isAuthenticated() && (
            <>
               

            <li className="nav-item">
            
            <Link className="nav-link" 
            style={isActive(history,`/findpeople`,{color:"#ffff"})} to={`/findpeople`}>
            Find People
            </Link>
            
            </li>

            
            

            <li className="nav-item">
            
            <Link className="nav-link" 
            style={isActive(history,`/user/${isAuthenticated().user._id}`,{color:"#ffff"})} 
            to={`/user/${isAuthenticated().user._id}`}>
            {`${isAuthenticated().user.name}'s Profile`}
            </Link>
            
            </li>

            <li className="nav-item">
            <span className="nav-link" style={isActive(history,'/signup'),{cursor:"pointer",color:"#fff"}}
             onClick={() => signout(() => history.push('/'))} >Sign Out</span>
            </li>


                </>
            )}
            
            
            
        </ul>
       
        
    </div>
);


export default withRouter(Menu);


