import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import {signin,authenticate} from '../auth';
import logo from '../images/logo.png';

class Signin extends Component {
    constructor(){
        super();
        this.state ={
            email:"",
            password:"",
            error:"",
            redirectToRefer:false,
            loading:false
            
        };
    }

    handleChange = (name) => (event) =>{
        this.setState({error:""});
        this.setState({[name]:event.target.value});
    };
   

    clickSubmit = (event) =>{
        event.preventDefault();
        this.setState({loading:true});
        const { email,password} = this.state;
        const user = {
            email,
            password,
            
        };
        // console.log(user);
        signin(user)
        .then(data =>{
            if (data.error) 
            {this.setState({error:data.error,loading:false});
        
        }
            else {
                //authenticate
                authenticate(data,() =>{
                    this.setState({redirectToRefer:true});
                });

               
            }
        }) ;

    };
    

    signinForm = (email,password) =>(

        <form>
                   
                <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input  value={email} onChange={this.handleChange("email")} type="email" className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input value={password} onChange={this.handleChange("password")} type="password" className="form-control"></input>
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">Submit</button>
                </form>
    );

    render() {
        const {email,error,password,redirectToRefer,loading} = this.state;
        if(redirectToRefer){
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                {/* <h1 className="heading">MINDSPACE</h1> */}
                {/* <img className="sidebar_avatar" src={logo} alt="logo" /> */}
                <h2 className="mt-5 mb-5  subheading">SignIn</h2>

                <div className="alert alert-danger" style={{display:error ? "": "none"}}>{error}</div>
                {loading ? <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div> : ""}
                
                {this.signinForm(email,password)}
            </div>
        )
    }
};

export default Signin;
