import './Events.css';
import EventItem from './EventItem';


function Events({ events = [] }) {
    return (
        <div className='event-list'>
            {events.length > 0 ? events.map((event, index) =>
                <EventItem data={event} key={index} />
            )
                :
                <h2 className='message'>Không có sự kiện nào sắp tới!</h2>
            }
        </div>
    )
}

export default Events;