import {
   MatchedSchedule,
   MatchedSchedules,
   EmptySchedule,
   EmptySchedulesType,
} from '../mocks/fetchData'
import Theme from '../utils/theme'

import { DateDomainService } from './DateDomainService'

export class FormatScheduleService {
   //emptySchedules を fullCalendar に合う形で整形するメソッド
   public getFormattedEmptySchedules(emptySchedules: EmptySchedulesType): any {
      const dateDomainService = new DateDomainService()
      return emptySchedules.map((schedule: EmptySchedule) => {
         return {
            title: '空き時間',
            start: dateDomainService.changeUnixTimeToFormattedString(
               schedule.start_at
            ),
            end: dateDomainService.changeUnixTimeToFormattedString(
               schedule.end_at
            ),
            color: Theme.color.primaryColor,
         }
      })
   }
   //matchedSchedules を fullCalendar に合う形で整形するメソッド
   public getFormattedMatchedSchedules(
      matchedSchedules: MatchedSchedules
   ): any {
      const dateDomainService = new DateDomainService()
      return matchedSchedules.map((schedule: MatchedSchedule) => {
         return {
            title: schedule.matched_member.name,
            start: dateDomainService.changeUnixTimeToFormattedString(
               schedule.start_at
            ),
            end: dateDomainService.changeUnixTimeToFormattedString(
               schedule.end_at
            ),
            color: Theme.color.secondaryColor,
         }
      })
   }
}
