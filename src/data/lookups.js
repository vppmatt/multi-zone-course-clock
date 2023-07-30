import {createContext} from "react";

export const countries = ["UK/Ireland", "USA", "India", "China", "Singapore", "Central EU"]
export const timeZones = [
    ["UK/Ireland", "GMT", 0],
    ["UK/Ireland", "BST/IST (summer)", 1],
    ["USA", "EST", -5],
    ["USA", "EDT (summer)", -4],
    ["USA", "CST", -6],
    ["USA", "CDT (summer)", -5],
    ["USA", "MST", -7],
    ["USA", "MDT (summer)", -6],
    ["USA", "PST", -8],
    ["USA", "PDT (summer)", -8],
    ["India", "IST", 5.5],
    ["China", "CST (China)", 8],
    ["Singapore", "SGT", 8],
    ["Central EU", "CET", 1],
    ["Central EU", "CEST (summer)", 2]
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

export const timeDiff = (time1, time2) => {
    const h1 = +time1.substring(0,2);
    const m1 = +time1.substring(3,5);
    const h2 = +time2.substring(0,2);
    const m2 = +time2.substring(3,5);
    const t1 = h1*60 + m1;
    const t2 = h2*60 + m2;
    const total = t1-t2;
    if (total < 0) return "past";
    if (total > 60) return Math.floor(total / 60) + "h " + total % 60 + "m";
    return t1-t2 + " mins";
}

export const EventsContext = createContext({events :[], addEvent : () => {}, removeEvent : () => {}});

