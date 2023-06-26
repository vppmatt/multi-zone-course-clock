import {createContext} from "react";

export const countries = ["UK", "USA", "India", "Singapore"]
export const timeZones = [
    ["UK", "GMT", 0],
    ["UK", "BST", 1],
    ["USA", "EST", -5],
    ["USA", "EDT", -4],
    ["USA", "CST", -6],
    ["USA", "CDT", -5],
    ["USA", "MST", -7],
    ["USA", "MDT", -6],
    ["USA", "PST", -8],
    ["USA", "PDT", -8],
    ["India", "IST", 5.5],
    ["Singapore", "SGT", 8]
];

export const getInTimeZone = (time, timeZone, desiredTimeZone) => {
     const tzH = timeZones.find(tz => tz[1]===timeZone)[2];
     const dtzH = timeZones.find(tz => tz[1]===desiredTimeZone)[2];
     const hours = time.substring(0,2);
     let mins = +time.substring(3,5);
     let newHours = +hours + (dtzH - tzH);
     if (newHours*60 % 60 !== 0) {
        mins = mins + newHours*60 % 60;
        newHours = Math.floor(newHours);
        if (mins > 59) {
            newHours++;
            mins -= 60;
        }
     }

     if (newHours < 0) newHours += 24;
     if (newHours > 23) newHours -= 24;

     const fullHours = newHours < 10 ? "0" + newHours : newHours;
     const fullMins = mins < 10 ? "0" + mins : mins;
     return fullHours + ":" + fullMins;
}

export const EventsContext = createContext({events :[], addEvent : () => {}, removeEvent : () => {}});
