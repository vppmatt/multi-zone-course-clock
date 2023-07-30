import {useContext, useEffect} from "react";
import {EventsContext} from "../data/lookups";

const EventRemover = (props) => {

    const {events, addEvent, removeEvent} = useContext(EventsContext);

    const remove = (idx) => {
        removeEvent(events[idx]);
    }

    return <>
        {events.map ( (e,idx) =><div className="col-3" key={idx}>{e.name} at {e.time}<br/>
            <button className="button btn-primary btn-sm" onClick={ ()=>remove(idx)}>remove</button>
        </div>)}
        </>

}

export default EventRemover;
