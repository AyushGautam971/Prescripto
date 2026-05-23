import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
     const {dToken}  = useContext(DoctorContext)
    
      
    const navStyle = ({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'bg-gray-200 border-r-4 border-primary' : ''}`

  return (
    <div className='min-h-screen bg-white border-right'>
        {
            aToken && <ul className='text-[#515151] mt-5'>

                <NavLink className={navStyle} to={'/admin-dashboard'}>
                    <img src={assets.home_icon}/>
                    <p className='sm-hidden md:block'>Dashboard</p>
                </NavLink>

                  <NavLink  className={navStyle} to={'/all-appointments'} >
                    <img src={assets.appointment_icon} alt=""/>
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                  <NavLink className={navStyle} to={'/add-doctor'}>
                    <img src={assets.add_icon} alt=""/>
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>

                  <NavLink className={navStyle} to={'/doctor-list'}>
                    <img src={assets.people_icon} alt=""/>
                    <p className='hidden md:block'>Doctor List</p>
                </NavLink>

            </ul>
        }

          {
            dToken && <ul className='text-[#515151] mt-5'>

                <NavLink className={navStyle} to={'/doctor-dashboard'}>
                    <img src={assets.home_icon} alt=""/>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                  <NavLink  className={navStyle} to={'/doctor-appointments'} >
                    <img src={assets.appointment_icon} alt=''/>
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                 
                  <NavLink className={navStyle} to={'/doctor-profile'}>
                    <img src={assets.people_icon} alt=''/>
                    <p className='hidden md:block'>Profile</p>
                </NavLink>

            </ul>
        }
    </div>
  )
}

export default Sidebar