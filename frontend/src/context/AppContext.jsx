import { createContext, useState,useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();
const AppContextProvider = (props) =>{

   const currencySymbol = '$'
   const backendUrl = import.meta.env.VITE_BACKEND_URL
     const [doctors,setDoctors]  = useState([]) 
     const [token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):false)

     const [userData,setUserData] = useState(false)



    const getDoctorsdata = async () =>{
        try{
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            console.log(data)
            if(data.success){
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }
        }
        catch(err){
             console.log(err)
             toast.error(err.message)
        }
    }

      const loadUserProfileData = async() => {
          try{
            console.log(token)
              const {data } = await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
                console.log(data)
              if(data.success){

                setUserData(data.userData)
              }
              else {
                toast.error(data.message)
              }
          }
          catch(err){
             console.log(err)
             toast.err(err.message)
          }
      }

      
     const value = {
      doctors, getDoctorsdata,
      currencySymbol,
      token,setToken,
      backendUrl,
      userData,setUserData,
      loadUserProfileData
    }
    useEffect(()=>{
       getDoctorsdata()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
              setUserData(false)
        }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
 export default AppContextProvider;



// import { createContext, useState, useEffect } from "react";
// import axios from 'axios'
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {

//    const currencySymbol = '$'
//    const backendUrl = import.meta.env.VITE_BACKEND_URL

//    const [doctors,setDoctors]  = useState([])
//    const [token,setToken] = useState(localStorage.getItem('token') || false)
//    const [userData,setUserData] = useState(false)

//    const getDoctors = async () => {
//         try{
//             const {data} = await axios.get(backendUrl + '/api/doctor/list')

//             if(data.success){
//                 setDoctors(data.doctors)
//             } else {
//                 toast.error(data.message)
//             }
//         }
//         catch(err){
//              console.log(err)
//              toast.error(err.message)
//         }
//    }

//    const loadUserProfileData = async() => {
//         try{
//             const {data } = await axios.get(
//                 backendUrl + '/api/user/get-profile',
//                 { headers:{ token } }
//             )

//             if(data.success){
//                 setUserData(data.userData)
//             } else {
//                 toast.error(data.message)
//             }
//         }
//         catch(err){
//              console.log(err)
//              toast.error(err.message)
//         }
//    }

//    const value = {
//       doctors,
//       getDoctors,
//       currencySymbol,
//       token,
//       setToken,
//       backendUrl,
//       userData,
//       setUserData,
//       loadUserProfileData
//    }

//    useEffect(()=>{
//        getDoctors()
//    },[])

//    useEffect(()=>{
//         if(token){
//             loadUserProfileData()
//         } else {
//             setUserData(false)
//         }
//    },[token])

//    return(
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//    )
// }

// export default AppContextProvider;
