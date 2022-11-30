import React from 'react'
import { useEffect } from 'react'

const UserDashboard = () => {
     useEffect(() => {
       const fetchWorkouts = async () => {
         const response = await fetch(
           "https://localhost:8080/",
           { mode: "cors" }
         );
         const json = await response.json();

         if (response.ok) {
           dispatch({ type: "SET_EVENTS", payload: json });
         }
       };
       fetchWorkouts();
     }, [dispatch]);
    
  return (
    <div>

    </div>
  )
}

export default UserDashboard