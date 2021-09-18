import moment from 'moment'

export const empty_schedules = [
   {
      schedule_id: 0,
      start_at: moment('2021-09-21T09:30:00').unix(),
      end_at: moment('2021-09-21T09:30:00').unix(),
   },
   {
      schedule_id: 0,
      start_at: moment('2021-09-22T09:30:00').unix(),
      end_at: moment('2021-09-22T09:30:00').unix(),
   },
]

export const matched_schedules = [
   {
      schedule_id: 0,
      start_at: moment('2021-09-22T09:30:00').unix(),
      end_at: moment('2021-09-22T10:00:00').unix(),
      matched_member: {
         user_id: 0,
         name: 'asahara',
      },
   },
]

export const members = [
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

export const user_info = {
   user_id: 0,
   name: '浅原',
   tags: ['React'],
}
