import './DetailEventPage.css';
import { useState, useEffect, useContext, useRef,useCallback } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../store';
import { useCheckEvent } from '../../hooks';
import { getInforEventsService } from '../../services';
import { Channel, FormRegistrationEvent } from '../../components';

function DetailEventPage() {
    const formRegisterEventRef = useRef(null);
    const navigate = useNavigate();
    const { eventSlug } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const organizerSlug = searchParams.get('org');
    if (!organizerSlug) navigate('/error-page-404');

    const [state] = useContext(StoreContext);
    console.log(state);
    const currentUser = state.currentUser;
    const listRegistedEvent = state.listRegistedEvent;
    const checkRegistedEvent = useCheckEvent(currentUser, eventSlug, listRegistedEvent);

    const [inforEvent, setInforEvent] = useState(null);
    const [sessionsOfEvent, setSessionsOfEvent] = useState([]);
    const [listSessionRegisted, setListSessionRegisted] = useState([]);


    //call api get infor detail event;
    useEffect(() => {
        const getInforEvent = async (organizerSlug, eventSlug) => {
            const data = await getInforEventsService(organizerSlug, eventSlug);
            setInforEvent(data);
        }
        getInforEvent(organizerSlug, eventSlug);
    }, [organizerSlug, eventSlug])

    //get sesions of event;
    useEffect(() => {
        if (inforEvent) {
            let listSessionOfEvent = [];
            inforEvent?.channels.forEach((channel) => {
                channel?.rooms.forEach((room) => {
                    listSessionOfEvent = [...listSessionOfEvent, ...room?.sessions];
                })
            })
            setSessionsOfEvent(listSessionOfEvent);
        }
    }, [inforEvent])

    //khi componet re-render lại mà event registed thì ta sẽ lưu trữ list sessions registed;
    useEffect(() => {
        if (checkRegistedEvent) {
            setListSessionRegisted(checkRegistedEvent.sessionIds);
        }
    }, [checkRegistedEvent])

    const updateSessionsRegisted = useCallback((data) => {
        setListSessionRegisted((prev) => [...prev, data]);
    }, [])

    const handleShowFormRegisterEvent = () => {
        if (!currentUser) return navigate('/login');
        formRegisterEventRef.current.onShow();
    }

    return (
        <div className="detail">
            <div className='top'>
                <h2 className='title'>{inforEvent?.name}</h2>
                <button className='btn btn-primary top-btn'
                    onClick={handleShowFormRegisterEvent}
                >
                    Đăng ký sự kiện
                </button>
            </div>
            <div className='event-content'>
                <div className='event-content-title'>
                    <h3 className='event-content-title-text'>Kênh</h3>
                    <h3 className='event-content-title-text'>Phòng</h3>
                    <div className="event-content-titmes">
                        <span className="body-times-item"></span>
                        <span className="body-times-item">01:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">03:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">05:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">07:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">09:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">11:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">13:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">15:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">17:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">19:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">21:00</span>
                        <span className="body-times-item"></span>
                        <span className="body-times-item">23:00</span>
                    </div>
                </div>
                <div className="channels">
                    {inforEvent?.channels.length > 0 ?
                        inforEvent.channels.map((channel, index) =>
                            <Channel data={channel} key={index} sessionsRegisted={listSessionRegisted}
                            />)
                        :
                        <h3 className='detail-message text-center p-4'>
                            Không có thông tin cụ thể
                        </h3>
                    }
                </div>
            </div>
            <FormRegistrationEvent
                name={inforEvent?.name}
                tickets={inforEvent?.tickets}
                ref={formRegisterEventRef}
                sessions={sessionsOfEvent}
                updateSessionsRegisted={updateSessionsRegisted}
            />
        </div>
    )
}

export default DetailEventPage;