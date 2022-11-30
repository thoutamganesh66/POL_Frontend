import axios from "axios";
import { useState,useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./mineblock.css";
// import {Redirect} from "react-router-dom";

const MineBlock = () =>{

    const [data,setData] = useState("");
    const [mineStatus,setMineStatus] = useState(false);
    const [available,setAvailable] = useState(false);
    const [randomNumbers,setRandomNumbers] = useState();
    const [priorityqueue,setPriorityQueue] = useState([]);
    const [pq,setpq] = useState([]);
    const [miner,setMiner] = useState("");
    const handleChange = (e) =>{
        setData(e.target.value);
    }

    useEffect(()=>{
        if(randomNumbers!=undefined){

            randomNumbers.sort((a,b)=>a.randomNumber - b.randomNumber);
            let pq = randomNumbers.slice(0,4);
            setpq(pq)
        }
    },[randomNumbers])

    useEffect(()=>{

        if(pq != undefined){
            // console.log()
            setPriorityQueue(pq);
            console.log("pq:"+pq);
            setMineStatus(true);            
        }
    },[pq])

    useEffect(()=>{
        console.log("priori queue: "+priorityqueue);
        if(mineStatus!=false)
        {
            setMiner(priorityqueue.length!=0?priorityqueue[0].nameName:"");
        }
    },[pq,priorityqueue])
    console.log("priori qu :" + priorityqueue);
    
    const handleMine = (e) =>{
        //hit mine api here...
        // e.preventDefault();
        const form= new FormData();
        const url="http://localhost:4000/mining/generateRandom";
        form.append('data',data);
        console.log("formdata is "+form.get("data"));
        axios.post(url,{
            BlockData:form.get("data")
        })
        .then(res=>{
            console.log(res.data.minermaps);
            setRandomNumbers(res.data.minermaps);
            // console.log("random numbers stored: "+randomNumbers);                        
        })
        .catch(err=>{
            console.log(err);
            setMineStatus(false);
        })
    }

    const successMine = (e) =>{
        e.preventDefault();
        const form = new FormData();
        const url = "http://localhost:4000/mining/addNewBlock";
        form.append("miner",miner);
        console.log("miner is "+form.get("miner"));
        axios.post(url,{
            minerName:form.get("miner")
        })
        .then(res=>{
            console.log(res);
            setAvailable(true);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    // const MinerUnavailable = ()=>{
    //     if(pq.length>0)
    //     {
    //         setpq(pq.shift());
    //         console.log("came here")
    //     }
    //     else
    //     {
    //         console.log("none have mined..Generating new set of numbers");
    //         handleMine();
    //     }
    // }
    const failMine = (e) =>{
        e.preventDefault();
        const form = new FormData();
        const url = "http://localhost:4000/mining/getresponse";
        form.append("miner",miner);
        console.log("failed miner "+miner);
        axios.post(url,{
            minerName:form.get("miner")
        })
        .then(res=>{
            console.log(res);
            setAvailable(false);
            // MinerUnavailable();
            if(pq.length>0)
        {
            // setpq(pq.shift());
            pq.shift();
            setpq(pq)
            console.log("came here")
        }
        else
        {
            console.log("none have mined..Generating new set of numbers");
            handleMine();
        }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return(
        <div>
            <Navbar/>
            <div className="container mt-5">
                <div className="text-center ">
                    <h4 className="data-title">Data</h4>
                    <textarea rows={20} cols={40} onChange={handleChange}/>
                    <br/>
                    <button className="mine-button mt-5 text-center" onClick={handleMine}>Mine</button>
                </div>
                {/* display generated random numbers after clicking mine.
                    display the Selected miner.
                    display yes or no for mine.
                */}
                {
                mineStatus ?
                <div className="randomNumberSection mt-4">
                    {/* display random numbers here */}
                    {/* display priority queue here */}
                    {/* display miner and */}
                    <h3 className="randomTitle">Random Numbers:</h3>
                    <div className="randnum-section ml-2">
                        {randomNumbers?.map(Miner=>{
                            return(                                
                                <div className="randnum" key={Miner._id}>
                                    {Miner.nameName} --{">"}<span className="number"> {Miner.randomNumber}</span>
                                </div>                           
                            )
                        })}
                    </div>
                    <h3 className="randomTitle mt-2">Priority Queue</h3>
                    <div className="randnum-section">
                        {priorityqueue?.map(Miner=>{
                            return(                
                                <div className="randnum" key={Miner._id}>
                                    {Miner.nameName} --{">"}<span className="number"> {Miner.randomNumber}</span>
                                 </div>                           
                            )
                        })}
                    </div>
                    <div className="Mine">
                        <h4 className="randomTitle mt-2">Selected Miner</h4>
                        <h3 className="MinerTitle randnum-section">{priorityqueue.length!=0?priorityqueue[0].nameName:""}</h3>
                        <button className="success" onClick={successMine}>Yes</button>
                        <button className="dange" onClick={failMine}>No</button>
                    </div>
                </div>
                :
                <div className="loading">
                    <h2>Loading...</h2>
                </div>
                }
                {/* {
                    available?
                    <Redirect to="/"></Redirect>
                    :
                    <>
                    </>
                } */}
            </div>
        </div>
    );
}

export default MineBlock;