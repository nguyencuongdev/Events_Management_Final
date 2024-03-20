import Header from '../Header';

function OnlyHeaderLayout({ children }) {
    return (
        <div className='wrapper'>
            <Header />
            <main className='container-fluid main'>
                <div className='row'>
                    <div className='col'>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default OnlyHeaderLayout;