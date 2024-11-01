import React from 'react';
import { Link } from 'react-router-dom';

function TemplateList() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>

                </ul>
            </nav>

            <div>
                Template List Page
            </div>
        </div>
    );
}

export default TemplateList;
