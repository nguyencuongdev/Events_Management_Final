import './Channel.css';
import Room from '../Room';

function Channel({ data, sessionsRegisted = [] }) {
    return (
        <article className='channel'>
            <h4 className='channel-name'>{data?.name}</h4>
            <div className='channel-rooms'>
                {
                    data?.rooms.length > 0 ? data?.rooms.map((room, index) =>
                        <Room data={room} key={index} sessionsRegisted={sessionsRegisted}/>)
                        :
                        <h3 className='channel-message'>Không có thông tin cụ thể</h3>
                }
            </div>
        </article>
    )
}

export default Channel;