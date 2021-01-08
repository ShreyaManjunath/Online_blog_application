import React, { Component } from 'react';
import {signup} from '../auth';
import {Link} from 'react-router-dom';

class Signup extends Component {
    constructor(){
        super();
        this.state ={
            name:"",
            email:"",
            password:"",
            error:"",
            open:false
        };
    }

    handleChange = (name) => (event) =>{
        this.setState({error:""});
        this.setState({[name]:event.target.value});
    };

    clickSubmit = (event) =>{
        event.preventDefault();
        const {name, email,password} = this.state;
        const user = {
            name,
            email,
            password,
            
        };
        // console.log(user);
        signup(user)
        .then(data =>{
            if (data.error) this.setState({error:data.error});
            else this.setState({
                error:"",
                name:"",
                email:"",
                password:"",
                open:true
            });
        }) ;

    };
    
    signupForm = (name,email,password) =>(
        <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input value={name} onChange={this.handleChange("name")} type="text" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input value={email} onChange={this.handleChange("email")} type="email" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input value={password} onChange={this.handleChange("password")} type="password" className="form-control"></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
    );

    render() {
        const {name,email,error,password ,open} = this.state;

        return (
            // <div className="sign">
            <div className="container">
                <h2 className="mt-5 mb-5 subheading">Signup</h2>

                <div className="alert alert-danger" style={{display:error ? "": "none"}}>{this.state.error}</div>

                <div className="alert alert-info" style={{display: open ? "": "none"}}>
                New account is successfully created!!! 👍.Please <Link to="/signin">Sign In</Link>.</div>

                {this.signupForm(name,email,password)}
            </div>
            // </div>
        );
    }
};

export default Signup;
