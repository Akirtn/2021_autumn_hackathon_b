import moment from 'moment'
import React, { createContext, FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import {
   user_info,
   empty_schedules,
   matched_schedules,
   members,
} from '../../mocks/fetchData'
import {
   UserInfo,
   Members,
   EmptySchedulesType,
   MatchedSchedule,
   MatchedSchedules,
} from '../../types/types'
import ScheduleTemplate from '../templates/scheduleTemplate'

type ContextProps = {
   userInfo: UserInfo
   setUserInfo: any
   emptySchedules: EmptySchedulesType
   setEmptySchedules: any
   matchedSchedules: MatchedSchedules
   setMatchedSchedules: any
   memberList: Members
   setMemberList: any
   // startDate: any
   // setStartDate: any
   // endDate: any
   // setEndDate: any
   selectUnixTime: any
   setSelectUnixTime: any
}

export const ScheduleContext = createContext({} as ContextProps)

const Schedule: FC = () => {
   const user = localStorage.getItem('user')

   // ログイン API 叩けるようになったらこの処理
   // const [userInfo, setUserInfo] = useState<UserInfo>(user)
   const [userInfo, setUserInfo] = useState<UserInfo>(user_info)
   const [emptySchedules, setEmptySchedules] =
      useState<EmptySchedulesType>(empty_schedules)
   const [matchedSchedules, setMatchedSchedules] =
      useState<MatchedSchedules>(matched_schedules)
   const [memberList, setMemberList] = useState<Members>(members)
   const [selectUnixTime, setSelectUnixTime] = useState<number>(moment().unix())
   // const [startDate, setStartDate] = useState(moment().format('HH:mm'))
   // const [endDate, setEndDate] = useState(moment().format('HH:mm'))
   // const [alert, setAlert] = useState({
   //    message: '',
   //    severity: '',
   //    isAlert: false,
   // })

   const location = useLocation()

   // ここにユーザ情報入ってます
   //console.log(location.state)
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
               // startDate,
               // setStartDate,
               // endDate,
               // setEndDate,
               selectUnixTime,
               setSelectUnixTime,
            }}
         >
            <ScheduleTemplate />
         </ScheduleContext.Provider>
      </div>
   )
}

export default Schedule
