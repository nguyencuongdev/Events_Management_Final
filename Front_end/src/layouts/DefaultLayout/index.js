import './DefaultLayout.css';
import Header from '../Header';

function DefaultLayout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <main className="container-fluid content">
                <div className="row">
                    <div className="col">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DefaultLayout;