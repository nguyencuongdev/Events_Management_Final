import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { actions } from '../../store';
import { logoutService } from '../../services';

import { StoreContext } from '../../store';

function Header() {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(StoreContext);
    const currentUser = state?.currentUser;
    const handleLogout = async (e) => {
        e.preventDefault();
        const res = await logoutService(currentUser?.token);
        if (res?.message === 'Đăng xuất thành công') {
            dispatch(actions.clearInforUser());
            dispatch(actions.clearListRegistedEvent());
            navigate('/login');
            return;
        }
        alert('Thao tác hiện không thể thực hiện do không thể xác thực!');
    }

    return (
        <header className="header fixed-top">
            <nav className="navbar navbar-dark bg-dark flex-md-nowrap shadow">
                <Link className="navbar-brand col-sm-3 col-md-2 px-0" to="/">
                    Nền tảng sự kiện
                </Link>
                {
                    currentUser ?
                        <span className="navbar-organizer w-100 text-white">
                            {currentUser?.firstname + ' ' + currentUser?.lastname}
                        </span>
                        :
                        <span className="navbar-organizer w-100"> </span>
                }
                <ul className="navbar-nav px-3">
                    {currentUser ?
                        <li className="nav-item text-nowrap">
                            <button className="nav-link btn btn-primary btn-sm px-1 text-white" id="logout" onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </li>
                        :
                        <li className="nav-item text-nowrap">
                            <Link className="nav-link btn btn-primary btn-sm px-1 text-white"
                                id="login"
                                to="/login"
                            >
                                Đăng nhập
                            </Link>
                        </li>
                    }
                </ul>
            </nav>
        </header >
    )
}

export default Header;