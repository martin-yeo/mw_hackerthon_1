import React from 'react';
import { Link } from 'react-router-dom';

function TemplateUpdate() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>

                </ul>
            </nav>

            <div>
                Template Update Page
                <div className="mt-1">
                    <table className="tbl tbl-border txt-center">
                        <thead>
                        <tr>
                            <th>num</th>
                            <th>name</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>

                            </td>
                            <td>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TemplateUpdate;
