
import './App.css';
import { QueryClient, QueryClientProvider} from "react-query";
import React from 'react';
import { Banner } from './components/Banner';
import { CourseList } from './components/Courses/CourseList';
import { addScheduleTimes } from './utitlities/Functions';
import {useData} from './utitlities/Firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditForm from './components/EditForm';



const fetchSchedule = async () => {

  
 const url = "https://firebasestorage.googleapis.com/v0/b/ubiqum-academy.appspot.com/o/MobileWeb%2Fschedule.json?alt=media&token=706644eb-f870-4065-8735-cbdf48204ad1"
  const response = await fetch('https://firebasestorage.googleapis.com/v0/b/ubiqum-academy.appspot.com/o/MobileWeb%2Fschedule.json?alt=media&token=706644eb-f870-4065-8735-cbdf48204ad1');
  
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};

const Main = () =>  {
  
  const [data, loading, error] = useData('/', addScheduleTimes);
 
  
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading the schedule...</h1>

  return (
    <div className="container">
      <Banner title={ data.title } />
      <BrowserRouter>
        <Routes>
            <Route path='/' element ={ <CourseList courses={ data.courses} />} />
            <Route path='/edit' element={<EditForm />} />

        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
};
const queryClient = new QueryClient();

 export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

