import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopUpNotification from './PopUpNotification';

// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
// import { makeStyles } from '@material-ui/core/styles';

export default function PatientNotifications(props) {
  // const [notificationCompleted, setNotificationCompleted] = useState(false);

  // useEffect(() => {
  //   console.log('notificationCompleted: ', notificationCompleted);
  // }, [notificationCompleted])


  //   // return new Date() <= new Date(`${notification.date} ${notification.time}`);
  // }
  
  //takes in notification and restructures to add new fields
  const deconstructedNotification = (notification) => {
    const notificationTime = new Date(`${notification.date} ${notification.time}`)
    console.log("THIS IS NOTIFICATION DEPLOYMENT TIME", notificationTime);
    const newNotificationObj = {
      id: notification.id,
      completed: notification.completed,
      time: notificationTime,
      pills: notification.pills,
      appointment: notification.appointment,
      food:notification.food,
      info: notification.info,
      patient: notification.patient
    }
    // console.log("This is our update note object", newNotificationObj);
    return newNotificationObj;
  }

  
  const ourNotifications = props.today;
console.log("These are out notifications", ourNotifications)
  const [todayNotes, setTodayNotes ]= useState([]);

  //generates POP UPS
  const setPopUps = (notifications) => {
    let finalResults=[];
     let today = new Date();
      today = today.getTime();
      // console.log(today)
    if(notifications){
      // toast.dismiss()
      // dismissToast()
      const newNotifications = notifications.map((notification) => {return deconstructedNotification(notification)});
      return newNotifications.map((notification) => {
        finalResults.push(notification);
        let startTime = notification.time.getTime()
        let endTime = startTime + 1000 * 60 * 60;

        // const notificationPopUp = toast(notification.info, {containerId: `${notification.id}`})
        const notificationPopUp = toast(notification.info, {containerId: `${notification.id}`})
        // setTodayNotes
        setTimeout(() => notificationPopUp, 3000);
        console.log("This is notification time", startTime);
          if (today >= startTime && today <= endTime && !notification.completed) {
            console.log("Found notifications for Today", notification);
            console.log("IS THIS TRUE", todayNotes.length >= finalResults.length)
            return (todayNotes.length >= finalResults.length ? printNotifications(notification) : finalResults.map((note)=>printNotifications(note))
            && todayNotes.length <finalResults.length ? setTodayNotes(finalResults): null)
          }
          // return null;
        }
      )
    } else {
      return null;
    }
    
  }
  // if(toast.isActive)
  
  const printNotifications = (notification)=>{
    return (
      <ToastContainer 
                        key={notification.id} 
                        isActive={true}
                        transition={Slide} 
                        autoClose={false} 
                        enableMultiContainer 
                        containerId={`${notification.id}`}
                        newestOnTop={true} 
                        onClick={() => saySomething(notification.id)} 
                        position={toast.POSITION.BOTTOM_LEFT} 
                        />
                        
                        )
                      }
                      
  const saySomething = (id)=>{console.log("HELLO", id)}
                      
  // props.today && props.today.length > 0 ? setInterval(setPopUps, 1000, ourNotifications) && clearInterval() : clearInterval()

  // props.today && props.today.length > 0 ? clearInterval() && setInterval(setPopUps, 1000*60, ourNotifications) : clearInterval()
  
  return (
    <>

      {props.user && props.today ? setPopUps(ourNotifications): clearInterval()}
    </>
  );
}
