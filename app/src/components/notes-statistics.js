import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './sidebar';
import profileicon from '../images/profile-icon.png';

function NotesStatisitics() {
    const url = 'http://127.0.0.1:5000'

    const [error, setError] = useState('');
    const [stats, setStats] = useState([]);
    
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date = new Intl.DateTimeFormat('en-US', options).format(today);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.clear();
        navigate("/login");
    }

    const displayStatistics = (statistics) => {
        if (statistics.length === 0){
            return ;
        } 
        else {
            // let statisticsItems = statistics.map((stat) =>
            //     <li className="statistics">
            //         <div className="details">
            //             <p>{stat.note.name}</p>
            //             <span>{stat.note.text}</span>
            //         </div>
            //         <div className="tags">
            //             <button className="tag">#{stat.note.idTag}</button>
            //         </div>
            //         <div className="bottom-content"></div>
            //         <div className="editors">
            //             <h1><i className='bx bxs-group'></i>Editors</h1>
            //             <p>{stat.username}</p>
            //             <br></br>
            //             <br></br>
            //             <p>Edited last by {stat.username} at {stat.statistic.time}</p>
            //         </div>
            //     </li>
            // );
            // return statisticsItems;
        }
    }

    useEffect(() => {
        const getNotes = () => {
            fetch(`${url}/user-statistics/${window.localStorage.getItem('id')}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                return response.text().then((text) => { throw new Error(text); });
            }).then((data) => {
                setStats(data);
            });
          }
        if (error === ''){
            getNotes();
        }
    }, [error]);

    return (
        <div>
            <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'></link>
            <input type="checkbox" id="check"></input>

            <div className="content">
                <p>NOTES</p>
                <div className="search-box">
                    <i className='bx bx-search icon'></i>
                    <input type="text"></input>
                </div>
                <br></br>

                <ul className="wrapper">
                    {displayStatistics(stats)}
                </ul>
            </div>

            { Sidebar(profileicon, window.localStorage.getItem('username'), logout) };
            <div className="content-image-note-statistics"></div>
            <div className="logo-header" id="logo-header">
                <span className="greetings">Notes Statistics</span>
                <span className="calendar-day">{date.toUpperCase()}</span>
            </div>

        </div>
    );
}

export default NotesStatisitics;
