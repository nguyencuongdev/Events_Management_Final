import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <nav className="d-md-block sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link py-0 active pl-0" to="/">Danh sách sự kiện</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Sidebar;