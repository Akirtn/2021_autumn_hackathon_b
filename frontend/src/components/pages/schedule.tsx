import moment from 'moment'
import React, { createContext, FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Api } from '../../action/action'
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
   const location = useLocation()
   const history = useHistory()
   const [userInfo, setUserInfo] = useState<any>(location.state)
   const [emptySchedules, setEmptySchedules] = useState<any>(undefined)
   const [matchedSchedules, setMatchedSchedules] = useState<any>(undefined)
   const [memberList, setMemberList] = useState<any>(undefined)
   const [selectUnixTime, setSelectUnixTime] = useState<number>(moment().unix())

   useEffect(() => {
      // console.log(localStorage.getItem('userInfo'))
      // console.log(location.state)
      Api.getMatchedSchedule().then((res: any) => {
         if (res) {
            setMatchedSchedules(res)
         }
      })
      Api.getEmptySchedule().then((res: any) => {
         if (res) {
            setEmptySchedules(res)
         }
      })

      Api.getMembers().then((res: any) => {
         if (res) {
            setMemberList(res)
         }
      })
      if (!userInfo && localStorage.getItem('userInfo')) {
         const getUserjson: any = localStorage.getItem('userInfo')
         console.log(getUserjson)
         console.log('aaa')
         const getUser: any = JSON.parse(getUserjson)
         console.log(getUser)
         setUserInfo(getUser)
         Api.getMatchedSchedule().then((res: any) => {
            if (res) {
               setMatchedSchedules(res)
            }
         })
         Api.getEmptySchedule().then((res: any) => {
            if (res) {
               setEmptySchedules(res)
            }
         })
         Api.getMembers().then((res: any) => {
            if (res) {
               setMemberList(res)
            }
         })
      } else {
         history.push({ pathname: '/' })
      }
   }, [])

   // ここにユーザ情報入ってます
   console.log({ userInfo, emptySchedules, matchedSchedules, memberList })
   return (
      <div>
         {userInfo && emptySchedules && matchedSchedules && memberList && (
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
                  selectUnixTime,
                  setSelectUnixTime,
               }}
            >
               <ScheduleTemplate />
            </ScheduleContext.Provider>
         )}
      </div>
   )
}

export default Schedule
