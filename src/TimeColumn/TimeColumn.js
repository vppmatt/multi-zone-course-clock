import {useContext, useState} from "react";
import {countries, EventsContext, getInTimeZone, timeZones} from "../data/lookups";

const TimeColumn = () => {

    const [timeZone, setTimeZone] = useState('');
    const [country, setCountry] = useState('');
    const [updating, setUpdating] = useState(false);

    const changeCountry = (e) => {
        setCountry(e.target.value);
        setUpdating(false);
    }

    const changeTimeZone = (e) => {
        setTimeZone(e.target.value);
        setUpdating(e.target.value != "");
    }

    const {events, addEvent} = useContext(EventsContext);


    const calcCurrentTime = () => {
        if (updating) {
            setTimeout(() => calcCurrentTime(), 60000);
        }
        if (timeZone==="") return "--:--";
        const timeNowLocal = new Date();
        const utcOffset =timeNowLocal.getTimezoneOffset();
        const timeNowUTC = new Date();
        timeNowUTC.setTime(timeNowUTC.getTime() + (utcOffset*60*1000));
        const offSet = timeZones.find(tz => tz[1]===timeZone)[2];
        const timeNowZoned = new Date();
        timeNowZoned.setTime(timeNowUTC.getTime() + (offSet*60*60*1000));
        const hours =  timeNowZoned.toLocaleTimeString().substr(0,2);
        const mins =   timeNowZoned.toLocaleTimeString().substr(3,2);
        return hours + ":" + mins;
    }

    return <div className="mt-3">
        <p>
            Country: <select onChange={changeCountry} defaultValue="">
            <option value="">--select--</option>
            {countries.map(c => <option key={c} value={c} >{c}</option>)}
        </select>
        </p>
        <p>Time zone: <select disabled={country===""} onChange={changeTimeZone} value={timeZone}>
        <option value="">--select--</option>
        {timeZones.filter(tz => tz[0]===country).map(tz => <option key={tz[1]} value={tz[1]}>{tz[1]}</option>)}
        </select>
        </p>
        <p>Current time: {calcCurrentTime()}</p>
        <p></p>
        {timeZone !== "" &&  events.map( (e,idx) => <p key={idx}>{e.name} at {getInTimeZone(e.time, 'GMT', timeZone)}</p>)}
    </div>

}

export default TimeColumn;
