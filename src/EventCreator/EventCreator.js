import {useContext, useState} from "react";
import {EventsContext, timeZones} from "../data/lookups";

const EventCreator = () => {

    const [name, setName] = useState('');
    const [time, setTime] = useState(new Date().toTimeString().substring(0,5));
    const [timeZone, setTimeZone] = useState('GMT');

    const {events, addEvent, removeEvent} = useContext(EventsContext);

    const add = () => {
        addEvent(name, time, timeZone);
    }

    return <div  className="">
        New event:
            <input className="mx-2" type="text" placeholder="Event name" value={name} onChange={ e => setName(e.target.value)}/>
        at
            <input className="mx-2" type="time" placeholder="Time" value={time} onChange={ e => setTime(e.target.value)}/>
        <select onChange={e =>  setTimeZone(e.target.value)} value={timeZone}>
            <option value="">--select--</option>
            {timeZones.map(tz => <option key={tz[1]} value={tz[1]}>{tz[1]}</option>)}
        </select>
        <button className="btn btn-primary btn-sm mx-2" onClick={add}>add</button>
    </div>
}

export default EventCreator;
