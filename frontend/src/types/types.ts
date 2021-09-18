import moment from 'moment'

export type UserInfo = {
   user_id: number
   name: string
   tags: string[]
}
export type Members = UserInfo[]

export type EmptySchedulesType = {
   schedule_id: number
   start_at: string
   end_at: string
}[]

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
