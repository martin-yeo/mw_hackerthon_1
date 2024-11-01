import React from 'react';
import { Link } from 'react-router-dom';

function TemplateDetail() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>

                </ul>
            </nav>

            <div>
                Template Detail Page
            </div>
        </div>
    );
}

export default TemplateDetail;
