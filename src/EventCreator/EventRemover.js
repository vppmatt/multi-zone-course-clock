import {useContext, useEffect} from "react";
import {EventsContext} from "../data/lookups";

const EventRemover = (props) => {

    const {events, addEvent, removeEvent} = useContext(EventsContext);

    const remove = (idx) => {
        removeEvent(events[idx]);
    }

    return <>
        {events.map ( (e,idx) => <p key={idx}>{e.name} at {e.time} <button className="button btn-primary btn-sm" onClick={ ()=>remove(idx)}>remove</button></p>)}

        </>

}

export default EventRemover;
