import './FormRegistrationEvent.css';
import { memo, forwardRef, useImperativeHandle, useRef, useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { registrationEventService } from '../../services';
import { StoreContext, actions } from '../../store';

const FormRegistrationEvent = forwardRef(({ name = '', tickets = [], sessions = [], updateSessionsRegisted }, ref) => {

    const formRegisterRef = useRef(null);
    const btnPurchase = useRef(null);
    const [state, dispath] = useContext(StoreContext);
    const currentUser = state.currentUser;

    const location = useLocation();
    const { eventSlug } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const organizerSlug = searchParams.get('org');

    useImperativeHandle(ref, () => {
        return {
            onShow: () => formRegisterRef.current.classList.add('show'),
            onHidden: () => formRegisterRef.current.classList.remove('show')
        }
    })
    const sessionsWorkShop = sessions.filter((session) => session.type === 'workshop');

    const countRegistrationSession = useRef(0);
    const [typeTicket, setTypeTicket] = useState(null);
    const [registrationSessionIds, setRegistrationSessionIds] = useState([]);
    const [costTicket, setCostTicket] = useState(0);
    const [addedSessionsCost, setAddedSessionsCost] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        const idsTypeTalk = [];
        const sessionsTypeTalk = [];
        sessions.forEach((session) => {
            if (session.type === 'talk') {
                idsTypeTalk.push(session.id);
                sessionsTypeTalk.push(session);
            }
        })
        setRegistrationSessionIds(idsTypeTalk);
    }, [sessions])

    const handleChoiceTicket = (e) => {
        let eParent = e.target.parentElement;
        while (!eParent.classList.contains('ticket')) {
            eParent = eParent.parentElement;
        }

        const id = +eParent.getAttribute('data-id');
        const name = eParent.querySelector('.ticket-name').innerText;
        const cost = +eParent.querySelector('.ticket-price').innerText;

        if (!e.target.checked) {
            btnPurchase.current.classList.remove('active');
            setTypeTicket(null);
            setCostTicket(0);
            setTotalCost((prev) => prev - costTicket);
            return;
        }
        btnPurchase.current.classList.add('active');
        setTypeTicket({ id, name, cost })
        setCostTicket(cost);
        setTotalCost((prev) => prev + cost);
    }

    const handleAddSession = (e) => {
        let eParent = e.target.parentElement;
        while (!eParent.classList.contains('workshop')) {
            eParent = eParent.parentElement;
        }

        const id = +eParent.getAttribute('data-id');
        const cost = +eParent.getAttribute('data-cost');

        if (!e.target.checked) {
            countRegistrationSession.current--;
            setRegistrationSessionIds((prev) => prev.filter((sessionId) => sessionId !== id));
            setAddedSessionsCost((prev) => prev - cost);
            setTotalCost((prev) => prev - cost);
            return;
        }
        countRegistrationSession.current++;
        setRegistrationSessionIds((prev) => [...prev, id]);
        setAddedSessionsCost((prev) => prev + cost);
        setTotalCost((prev) => prev + cost);
    }

    const closeFormRegister = () => {
        let amountRegistrationSessionDefault = registrationSessionIds.length - countRegistrationSession.current;
        btnPurchase.current.classList.remove('active');
        setTypeTicket(null);
        setCostTicket(0);
        setAddedSessionsCost(0);
        setTotalCost(0);
        setRegistrationSessionIds((prev) => prev.slice(0, amountRegistrationSessionDefault));
        countRegistrationSession.current = 0;
        formRegisterRef.current.classList.remove('show');
    }

    const handleRegistrationEvent = async (e) => {
        e.preventDefault();
        if (currentUser && typeTicket) {
            const data =
                await registrationEventService(
                    organizerSlug, eventSlug, currentUser.token,
                    { ticketId: typeTicket.id, sessionIds: registrationSessionIds }
                );
            switch (data.message) {
                case 'Vé không có sẵn':
                    alert(data.message)
                    break;
                case 'Đăng ký thành công':
                    closeFormRegister();
                    updateSessionsRegisted(registrationSessionIds);
                    dispath(actions.addRegistedEvent({
                        event: {
                            name,
                            slug: eventSlug,
                        },
                        session_ids: registrationSessionIds
                    }))
                    break;
                case 'Người dùng đã đăng ký':
                    alert('Không thể đăng ký lại')
                    break;
                case 'Người dùng chưa đăng nhập':
                    alert('Thao tác đã xảy ra lỗi! Vui lòng thử lại')
                    break;
                default: console.log('Lỗi phía server')
            }
        }
    }


    return (
        <div className='register-event' ref={formRegisterRef}>
            <div className="overlay" onClick={closeFormRegister}></div>
            <form action="" className="form-register" method='POST' onSubmit={handleRegistrationEvent}>
                <h2 className='form-register-title'>{name}</h2>
                <div className="form-register-tickets">
                    {tickets.map((ticket, index) => {
                        return (
                            <article className="ticket" key={index} data-id={ticket.id}>
                                <input type="checkbox" className="ticket-choice"
                                    onChange={handleChoiceTicket}
                                    checked={typeTicket?.name === ticket.name}
                                />
                                <div className="ticket-group">
                                    <h4 className='ticket-name'>{ticket.name}</h4>
                                </div>
                                <h4 className='ticket-price'>{ticket.cost}</h4>
                            </article>
                        )
                    })}
                </div>
                <div className="form-reigster-sessions">
                    <h4 className="sessions-title">Lựa chọn thêm các workshop muốn đặt: </h4>
                    <div className="sessions-list">
                        {sessionsWorkShop.map((session, index) => {
                            return (
                                <article className='session-workshop workshop'
                                    key={index} data-id={session.id} data-cost={session.cost} data-target={session.room_id}
                                    data-type={session.type}
                                >
                                    <input className='session-choice' type='checkbox'
                                        onChange={handleAddSession}
                                        checked={registrationSessionIds.includes(session.id)}
                                    />
                                    <span className='session-title'>{session.title}</span>
                                    <input className='session-start' type='hidden'
                                        value={session.start}
                                    />
                                    <input className='session-end' type='hidden' value={session.end} />
                                    <input type='hidden' className='session-speaker'
                                        value={sessions.speaker}
                                    />
                                    <input type='hidden' className='session-description'
                                        value={session.description}
                                    />
                                </article>
                            )
                        })}
                    </div>
                </div>
                <div className='form-register-pay'>
                    <div className="pay-container">
                        <div className="pay-infor">
                            <p className='pay-ticket pay-infor-item'>
                                Vé sự kiện:
                                <span id='event-cost' className='pay-price'>
                                    {costTicket}
                                </span>
                            </p>
                            <p className='pay-sessions pay-infor-item'>
                                Workshop bổ sung:
                                <span id='additional-cost' className='pay-price'>
                                    {addedSessionsCost}
                                </span>
                            </p>
                            <p className='separator'></p>
                            <p className='pay-total pay-infor-item'>
                                Tổng:
                                <span id='total-cost' className='pay-total'>
                                    {totalCost}
                                </span>
                            </p>
                        </div>

                        <button className="btn-pay btn btn-primary btn-block"
                            id="purchase" type='submit' ref={btnPurchase}
                        >
                            Mua
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
})

export default memo(FormRegistrationEvent);