import { Link } from 'react-router-dom';

function EventItem({ data }) {
    return (
        <article className='event'>
            <Link className='event-link'
                to={'/detail/events/' + data.slug + '?org=' + data.organizer.slug}
            >
                <h3 className='event-name'>{data.name}</h3>
                <p className='event-subtitle'>
                    <span className='event-organizer'>{data.organizer.name}</span>, Ngày
                    <span className='event-time'> {data.date}</span>
                </p>
            </Link>
        </article>
    )
}

export default EventItem;