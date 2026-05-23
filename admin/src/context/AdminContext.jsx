import React,{ createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminContext = createContext()

export const AdminContextProvider = (props) =>{
     const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    
     const [doctors,setDoctors] = useState([])
     const [appointments,setAppointments] = useState([])
     const [dashData,setDashData]  = useState(false)  
      
 

     const backendUrl = import.meta.env.VITE_BACKEND_URL
       
      const getAllDoctors = async() =>{

         try{
            
            const {data}  =  await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
            if(data.success){
               setDoctors(data.doctors)
               console.log(data.doctors)
            }
            else{
               toast.error(data.message)
            }
             
         }
         catch(error){
              toast.error(error.message)
         }
         
      }
       
       const changedAvailability = async (docId) =>{
           try{
                const {data} = await axios.post(backendUrl+'/api/admin/changed-availability',{docId},{headers:{aToken}})
                if(data.success){
                  toast.success(data.message)
                 await getAllDoctors()
                }
                else{
                  toast.error(data.message)
                }
           }
           catch(error){
             toast.error(error.message)
           }
       }
    
        const getAllAppointments = async() =>{
         try{
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
            if(data.success){
               setAppointments(data.appointments)
               console.log(data.appointments)
            }
            else{
               toast.error(data.message)
            }
         }
         catch(err){
            toast.error(err.message)
         }
        }

        const cancelAppointment =  async (appointmentId)=>{
         try{
            const {data}  = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.success){
               toast.success(data.message)
               getAllAppointments()
               getDashData()
            }
            else{
               toast.error(data.message)
            }
         }
         catch(err){
            toast.error(err.message)
         }
          
        }


       const getDashData  = async()=>{
          try{
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard',{headers:{aToken}})
               console.log(data)
            if(data.success){
               setDashData(data.dashData)
               console.log(data.dashData)
            }
            else{
               toast.error(data.message)
            }
          }
          catch(err){
            toast.error(err.message)
          }
       } 

   const value = {
      aToken,setAToken,
      backendUrl,
      doctors,
      getAllDoctors,changedAvailability,
      appointments,setAppointments,
      getAllAppointments,
      cancelAppointment,
      dashData,setDashData,
      getDashData
   }
 

   return(  

      <AdminContext.Provider value={value}>
    {props.children}
    </AdminContext.Provider>
   )
}


export default  AdminContextProvider