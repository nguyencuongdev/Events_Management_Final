import './HomePage.css';
import { useState, useEffect } from 'react';

import { getEventsService } from '../../services';
import { Events } from '../../components';

function HomePage() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            let list_events = await getEventsService();
            setEvents(list_events);
        }
        getEvents();
    }, [])


    return (
        <div className="home">
            <Events events={events} />
        </div>
    )
}

export default HomePage;