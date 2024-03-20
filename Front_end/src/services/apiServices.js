
export const getEventsService = async () => {
    try {
        const res = await fetch('http://localhost:8000/api/v1/events');
        const data = await res.json();
        return data.events;
    } catch (err) {
        console.log(err);
    }
}


export const getInforEventsService = async (organizerSlug, eventSlug) => {
    try {
        const res = await fetch('http://localhost:8000/api/v1/organizers/' + organizerSlug + '/events/' + eventSlug);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const loginService = async (lastName = '', registrationCode = '') => {
    try {
        const res = await fetch('http://localhost:8000/api/v1/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lastname: lastName,
                registration_code: registrationCode
            })
        })
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const logoutService = async (token = '') => {
    try {
        const res = await fetch('http://localhost:8000/api/v1/logout?token=' + token,
            {
                method: 'POST'
            }
        );
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const getListRegistedEventService = async (token = '') => {
    try {
        const res = await fetch('http://localhost:8000/api/v1/registrations?token=' + token);
        const data = await res.json();
        return data.registrations;
    }
    catch (err) {
        console.log(err);
    }
}


export const registrationEventService =
    async (organizerSlug, eventSlug, token = '', payload) => {
        try {
            const res = await fetch('http://localhost:8000/api/v1/organizers/' + organizerSlug + '/events/' + eventSlug + '/registration?token=' + token,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ticket_id: payload.ticketId,
                        session_ids: payload.sessionIds
                    })
                })
            const data = await res.json();
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }