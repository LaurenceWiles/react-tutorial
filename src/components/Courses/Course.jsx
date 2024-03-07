
import React from "react";
import { hasConflict } from "../../utitlities/Functions";
import { toggle } from "../../utitlities/Functions";
import { getCourseTerm } from "../../utitlities/Functions";
import { useUserState } from "../../utitlities/firebase";
import { getCourseNumber } from "../../utitlities/Functions";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

export const Course = ({ course, selected, setSelected }) => {
  const navigate = useNavigate();
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const [user] = useUserState();
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };

  return (
    <div className="card m-1 p-2" 
        style={style}
        onClick={(isDisabled) ? null : () => setSelected(toggle(course, selected))}
        onDoubleClick={!user ? null : () => reschedule(course, getMeetingData(course))}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">{ course.meets }</div>
      </div>
    </div>
  );
};

//onDoubleClick={!user ? null : () => reschedule(course, getMeetingData(course))}