import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
    return (
        <div>Main Page
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/template/list">Template List</Link></li>
                    <li><Link to="/template/detail">Template Detail</Link></li>
                    <li><Link to="/template/insert">Template Insert</Link></li>
                    <li><Link to="/template/update">Template Update</Link></li>
                    <li><Link to="/template/delete">Template Delete</Link></li>
                </ul>
            </nav>
        </div>
    );

}

export default Main;
