import React from "react";
import DayListItem from "./DayListItem";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function DayList () {

  const listDays = days.map((props)=>{
    return (
      <DayListItem 
        key={props.id}
        name={props.name} 
        spots={props.spots} 
        selected={props.name === props.day}
        setDay={props.setDay}  
      />
    )
  })

  return ( 
    <ul>
      {listDays}
    </ul>
  );
}