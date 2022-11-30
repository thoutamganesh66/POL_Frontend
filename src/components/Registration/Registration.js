 import React from 'react';
import {useState} from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import "./registration.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate } from "react-router-dom";
  
  const Registration = () => {

    const [name,setName] = useState("");
    const [stake,setStake] = useState(100);
    const [success,setSuccess] = useState(false);
    const [redirect,setRedirect] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handleStake = (e) => {
        setStake(e.target.value);
    };

     const handleSubmit = (e)=>{
        // e.preventDefault();
        const data = new FormData();
        const url="http://localhost:4000/miner/register";
        data.append('name',name);
        data.append('stake',stake);
        console.log("formdata is "+data.get("name"));
        // const config = {     
        //     headers: { 'content-type': 'multipart/form-data' }
        // }

        axios.post(url, {
            name:data.get("name"),
            stake:data.get("stake"),
        })
        .then(response => {
            // displayNotification();
                console.log(response);
                setSuccess(true);     
                toast.success('Success');    
        })
        .catch(error => {
                console.log(error);
                setSuccess(false);
                toast.warning('fail');
        });
    };
    
    return (
        <div>
            <Navbar/>
            <div className="register-container text-center mt-5">
                <h1 className="register-title">Miner Registration</h1>
                
                <div className="register-form mt-5">
                    {/* <div className="d-flex"> */}
                        <span className="input-title ml-4">Name:</span><input onChange={handleName} className="input" value={name} type="text" />
                    {/* </div> */}
                    <br/>
                    <span className="input-title">Stake:</span><input onChange={handleStake} className="input" value={stake} type="text" />
                    <br/>
                    <button className="register-button mt-5 text-center" onClick={handleSubmit}>Sign Up</button>
                    <ToastContainer/>
                </div>
            </div>
        </div>     
    );
}

export default Registration;