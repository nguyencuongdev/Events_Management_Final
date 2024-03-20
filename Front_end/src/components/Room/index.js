import './Room.css';
import Session from '../Session';


function Room({ data ,sessionsRegisted = []}) {

    return (
        <article className='room'>
            <h4 className='room-name'>{data?.name}</h4>
            <div className='room-sessions'>
                {data?.sessions.length > 0 ? data?.sessions.map((session, index) =>{
                    let className = sessionsRegisted.includes(session.id) ? 'registed' : '';
                    return <Session data={session} key={index} className={className}/>
                }
                )
                    :
                    <h3 className='room-message'>Không có thông tin cụ thể</h3>
                }

            </div>
        </article>
    )
}

export default Room;