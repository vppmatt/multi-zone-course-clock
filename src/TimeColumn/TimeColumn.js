import {useContext, useEffect, useState} from "react";
import {countries, EventsContext, getInTimeZone, timeDiff, timeZones} from "../data/lookups";
import {useInterval} from "../data/useInterval";

const TimeColumn = () => {

    const [country, setCountry] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [currentTime, setCurrentTime] = useState('--:--');
    const [displayEvents, setDisplayEvents] = useState([]);

    const changeCountry = (e) => {
        setCountry(e.target.value);
        setCurrentTime("--:--")
    }

    const changeTimeZone = (e) => {
        setTimeZone(e.target.value);
        setCurrentTime("...")
    }

    const {events, addEvent} = useContext(EventsContext);

    useInterval(() => {
        calcCurrentTime();
    }, 3000);

    const calcCurrentTime = () => {
        if (timeZone!=="")  {
            const timeNowLocal = new Date();
            const utcOffset = timeNowLocal.getTimezoneOffset();
            const timeNowUTC = new Date();
            timeNowUTC.setTime(timeNowUTC.getTime() + (utcOffset * 60 * 1000));
            const offSet = timeZones.find(tz => tz[1] === timeZone)[2];
            const timeNowZoned = new Date();
            timeNowZoned.setTime(timeNowUTC.getTime() + (offSet * 60 * 60 * 1000));
            const hours = timeNowZoned.toLocaleTimeString().substring(0, 2);
            const mins = timeNowZoned.toLocaleTimeString().substring(3, 5);
            setCurrentTime(hours + ":" + mins);

            setDisplayEvents(events.map((e, idx) => <p
                    key={idx}>{e.name} at {getInTimeZone(e.time, 'GMT', timeZone)}
                    ({timeDiff(getInTimeZone(e.time, 'GMT', timeZone), currentTime)})</p>))

        }

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
        <p>Current time: {currentTime}</p>
        <p></p>
        {displayEvents}
    </div>

}

export default TimeColumn;
