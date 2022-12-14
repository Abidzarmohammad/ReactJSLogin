//import hook react
import React, { useState, useEffect, useRef } from 'react';

//import hook useHitory from react router dom
import { useHistory } from 'react-router';
import Countdown from 'react-countdown';

//import axios
import axios from 'axios';


function Dashboard() {

    //state user
    const [user, setUser] = useState({});

    //define history
    const history = useHistory();

    //token
    const token = localStorage.getItem("token");

    //function "fetchData"
    const fetchData = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch user from Rest API
        await axios.get('http://localhost:8000/api/user')
        .then((response) => {

            //set response user to state
            setUser(response.data);
        })
    }

    //hook useEffect
    useEffect(() => {

        //check token empty
        if(!token) {
            //redirect login page
            history.push('/');
        }
        
        //call function "fetchData"
        fetchData();

        setTimeout(
            () => {
            alert("Please login again");
            logoutHandler()},
            30000
        );
        
    }, []);

    //function logout
    const logoutHandler = async () => {

        //set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //fetch Rest API
        await axios.post('http://127.0.0.1:8000/api/logout')
        .then(() => {

            //remove token from localStorage
            localStorage.removeItem("token");

            //redirect halaman login
            history.push('/');
        });
    };

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            Selamat Datang <strong className="text-uppercase">{user.name} </strong> 
                            <Countdown date={Date.now() + 30000}>
                                {/* <Completionlist /> */}
                            </Countdown>
                            <hr />
                            <h1>Selamat Datang di Halaman Dashboard Tugas Website React JS</h1>
                            <h2>Tugas ini diampuh untuk memenuhi tugas personal 2</h2>
                            <button onClick={logoutHandler} className="btn btn-md btn-info">Keluar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard;