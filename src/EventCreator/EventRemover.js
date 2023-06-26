import {useContext, useEffect} from "react";
import {EventsContext} from "../data/lookups";

const EventRemover = (props) => {

    const {events, addEvent, removeEvent} = useContext(EventsContext);

    const checkEvents = () => {
        const now = new Date();
        let hours = now.getHours() + now.getTimezoneOffset()/60;
        if (hours < 0) hours += 24;
        const mins = now.getMinutes();
        const badEvent = events.find(e => +e.time.substring(0,2) < hours || +e.time.substring(0,2) === hours && +e.time.substring(3,5) < mins);
        if (badEvent) removeEvent(badEvent);
    }

    return <button className="button btn-primary btn-sm" onClick={checkEvents}>clean up</button>

}

export default EventRemover;
