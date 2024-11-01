import React from 'react';
import { Link } from 'react-router-dom';

function TemplateDelete() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>

                </ul>
            </nav>

            <div>
                Template Delete Page
                <div className="mt-1">
                    <table className="tbl tbl-border txt-center">
                        <thead>
                        <tr>
                            <th>num</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
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

export default TemplateDelete;
