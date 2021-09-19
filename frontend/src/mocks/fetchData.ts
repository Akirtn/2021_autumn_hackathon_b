import moment from 'moment'

export type UserInfo = {
   user_id: number
   name: string
   tags: string[]
}

export type Members = UserInfo[]

export type EmptySchedule = {
   schedule_id: number
   start_at: string
   end_at: string
}

export type EmptySchedulesType = EmptySchedule[]

export type MatchedSchedule = {
   schedule_id: number
   start_at: string
   end_at: string
   matched_member: {
      user_id: number
      name: string
   }
}
export type MatchedSchedules = MatchedSchedule[]

export const empty_schedules: EmptySchedulesType = [
   {
      schedule_id: 0,
      start_at: String(moment('2021-09-21T09:30:00').unix()),
      end_at: String(moment('2021-09-21T09:30:00').unix()),
   },
   {
      schedule_id: 0,
      start_at: String(moment('2021-09-22T09:30:00').unix()),
      end_at: String(moment('2021-09-22T09:30:00').unix()),
   },
]

export const matched_schedules: MatchedSchedules = [
   {
      schedule_id: 0,
      start_at: String(moment('2021-09-22T09:30:00').unix()),
      end_at: String(moment('2021-09-22T10:00:00').unix()),
      matched_member: {
         user_id: 0,
         name: 'asahara',
      },
   },
]

export const members: Members = [
   {
      user_id: 1,
      name: '吉田',
      tags: ['React'],
   },
   {
      user_id: 2,
      name: '伊地知',
      tags: ['React'],
   },
]

export const user_info: UserInfo = {
   user_id: 0,
   name: '浅原',
   tags: ['React'],
}
