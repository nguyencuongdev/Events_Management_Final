import './Event.css';
import { Link } from 'react-router-dom';

function Event({ events }) {
    return (
        <div className="event_list">
            {events?.length > 0 && events.map((event) => {
                return (
                    <div className="event" key={event.id}>
                        <Link
                            to={"/event/detail/" + event.slug + "?og=" + event.organizer?.slug}
                            className="event_link"
                        >
                            <h4 className="event-name">
                                {event.name}
                            </h4>
                            <p className="event_subtile">
                                <span className="event_organizer">{event.organizer?.name}</span>,
                                <span className="event_date"> Ngày {event.date}</span>
                            </p>
                        </Link>
                    </div>
                )
            })}
        </div>
    );
}

export default Event;