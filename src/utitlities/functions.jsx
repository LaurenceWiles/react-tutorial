


import {terms, meetsPat, days} from './Variables'



export const getCourseTerm = course => (
    course && course.id ? terms[course.id.charAt(0)] : ''
  );
  
  export const getCourseNumber = course => (
    course && course.id ? course.id.slice(1, 4) : ''
   
  );


  export const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
  );
  

export const hasConflict = (course, selected) => (
    selected.some(selection => courseConflict(course, selection))
  )
  
  
  
 export const timeParts = meets => {
    const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
    return !match ? {} : {
      days,
      hours: {
        start: hh1 * 60 + mm1 * 1,
        end: hh2 * 60 + mm2 * 1
      }
    };
  };
  
  export const mapValues = (fn, obj) => (
    Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
  );
  
  export const addCourseTimes = course => ({
    ...course,
    ...timeParts(course.meets)
  });
  
 export  const addScheduleTimes = schedule => ({
    title: schedule.title,
    courses: mapValues(addCourseTimes, schedule.courses)
  });
  
  
  
 export  const daysOverlap = (days1, days2) => ( 
    days.some(day => days1.includes(day) && days2.includes(day))
  );
  
 export const hoursOverlap = (hours1, hours2) => (
    Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
  );
  
  export const timeConflict = (course1, course2) => (
    daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
  );
  
  export const courseConflict = (course1, course2) => (
    getCourseTerm(course1) === getCourseTerm(course2)
    && timeConflict(course1, course2)
  );
  

  export const isValidMeets = (meets) => {
    const parts = timeParts(meets);
    return (meets === '' || (parts.days && !isNaN(parts.hours?.start) && !isNaN(parts.hours?.end)));
  };
  
  export const validateCourseData = (key, val) => {
    switch (key) {
      case 'title': return /(^$|\w\w)/.test(val) ? '' : 'must be least two characters';
      case 'meets': return isValidMeets(val) ? '' : 'must be days hh:mm-hh:mm';
      default: return '';
    }
  };