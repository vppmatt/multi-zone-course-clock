import './App.css';
import TimeColumn from "./TimeColumn/TimeColumn";
import {useEffect, useState} from "react";
import {EventsContext, getInTimeZone} from "./data/lookups";
import EventCreator from "./EventCreator/EventCreator";
import EventRemover from "./EventCreator/EventRemover";

function App() {

    const [columns, setColumns] = useState(3);

    const [timeColumns, setTimeColumns] = useState([<TimeColumn/>, <TimeColumn/>, <TimeColumn/>]);

    const changeColumns = (e) => {
        const desiredValue = e.target.value;
        if (desiredValue > columns) {
            const newColumns = [...timeColumns];
            for (let i = columns; i < desiredValue; i++) {
                newColumns.push(<TimeColumn/>);
            }
            setTimeColumns(newColumns);
        }
        if (desiredValue < columns) {
            const newColumns = [...timeColumns];
            for (let i = columns; i > desiredValue; i--) {
                newColumns.pop();
            }
            setTimeColumns(newColumns);
        }
        setColumns(desiredValue);
    }

    const [events, setEvents] = useState([]);

    const addEvent = (name, time , timeZone) => {
        const gmtTime = getInTimeZone(time, timeZone, 'GMT');
        const events2 = [...events, {name : name, time: gmtTime}];
        events2.sort((a,b) => a.time.localeCompare(b.time))
        setEvents(events2);
    }

    const removeEvent = (event) => {
        setEvents(events.filter(e => e !== event));
    }

    return (
        <EventsContext.Provider value={{events,addEvent, removeEvent}}>
            <div className="container text-center">
                <div className="my-3 border center">
                    <p>Number of columns:
                        <select value={columns} onChange={changeColumns}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                </div>

                <div className="row align-items-start">
                    {timeColumns.map((tc, idx) =>
                        <div key={idx} className={idx % 2 === 0 ? 'col border bg-light' : 'col border'}>
                            {tc}
                        </div>)
                    }
                </div>

                <div className="row mt-3">
                    <EventCreator></EventCreator>
                </div>
                <div className="row mt-3">
                    <div className="col">
                    <EventRemover></EventRemover>
                    </div>
                </div>

            </div>

            </EventsContext.Provider>
    );

}

export default App;
