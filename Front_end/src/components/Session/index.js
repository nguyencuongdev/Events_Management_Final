import './Session.css';

function Session({ className = '', data = null }) {

    const start = new Date(data?.start).getHours();
    const end = new Date(data?.end).getHours();

    className += ' session session-start-' + start + ' session-end-' + end;
    return (
        <article className={className}>
            <h4 className="session-name">{data?.title}</h4>
        </article>
    )
}

export default Session;