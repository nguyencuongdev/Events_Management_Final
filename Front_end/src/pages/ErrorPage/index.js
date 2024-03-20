import './ErrorPage.css';

function ErrorPage({ message = '404' }) {
    return (
        <div className="error">
            <h2 className='message-error'>{message}</h2>
        </div>
    )
}

export default ErrorPage;