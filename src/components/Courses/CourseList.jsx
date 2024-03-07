import React from "react";
import { useState } from "react";

import { getCourseTerm } from "../../utitlities/Functions";

import { TermSelector } from '../Terms/TermSelector';

import { Course } from "./Course";

  
   export const CourseList = ({ courses }) => {
    const [term, setTerm] = useState('Fall');
    const [selected, setSelected] = useState([]);
    
    if (selected.some(course => course !== courses[course.id])) {
      setSelected([])
    };
    
    const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
    
    return (
      <>
        <TermSelector term={term} setTerm={setTerm} />
        <div className="course-list">
        { 
          termCourses.map(course =>
            <Course key={ course.id } course={ course }
              selected={selected} setSelected={ setSelected } 
            />) 
        }
        </div>
      </>
    );
  };
  