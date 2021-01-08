import React, { Component } from 'react';
import {list} from './apiUser';
import DefaultProfile from '../images/avatar.jpeg';
import {Link} from 'react-router-dom';

class Users extends Component {
    constructor(){
        super()
        this.state = {
            users:[]
        }
    }
    componentDidMount(){
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    renderUsers=(users) =>(
        <div className="row">
                 {users.map((user,i) =>(
                    <div className="card col-md-3 mb-4 mr-2 ml-5"  key={i}>
                    <img style={{height:"200px",width:"100%"}}
                 className="img-thumbnail mb-3" src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                 onError = {i => (i.target.src = `${DefaultProfile}`)}
                 alt={user.name} />
                        
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.email}</p>
                            <Link to={`/user/${user._id}`} className="btn btn-sm btn-raised btn-primary ">View Profile</Link>
                        </div>
                    </div>
                 ))}
             </div>
    );
    render() {
        const {users} = this.state;
        return (
            <div className="profile">
            <div className="container">
             <h2 className="mt-5 mb-5 heading">Users</h2>
             {this.renderUsers(users)}
                
            </div>
            </div>
        )
    }
}

export default Users;
