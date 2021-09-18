import React, { createContext, FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import {
   user_info,
   empty_schedules,
   matched_schedules,
   members,
} from '../../mocks/fetchData'
import ScheduleTemplate from '../templates/scheduleTemplate'

type ContextProps = {
   userInfo: any
   setUserInfo: any
   emptySchedules: any
   setEmptySchedules: any
   matchedSchedules: any
   setMatchedSchedules: any
   memberList: any
   setMemberList: any
}

export const ScheduleContext = createContext({} as ContextProps)

const Schedule: FC = () => {
   const [userInfo, setUserInfo] = useState<any>(user_info)
   const [emptySchedules, setEmptySchedules] = useState<any>(empty_schedules)
   const [matchedSchedules, setMatchedSchedules] =
      useState<any>(matched_schedules)
   const [memberList, setMemberList] = useState<any>(members)
   const location = useLocation()
   // ここにユーザ情報入ってます
   console.log(location.state)
   return (
      <div>
         <ScheduleContext.Provider
            value={{
               userInfo,
               setUserInfo,
               emptySchedules,
               setEmptySchedules,
               matchedSchedules,
               setMatchedSchedules,
               memberList,
               setMemberList,
            }}
         >
            <ScheduleTemplate />
         </ScheduleContext.Provider>
      </div>
   )
}

export default Schedule
