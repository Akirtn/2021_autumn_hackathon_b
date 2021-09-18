// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react'
import moment from 'moment'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useContext, FC, memo } from 'react'
import { ScheduleContext } from '../pages/schedule'
import { MatchedSchedule } from '../../mocks/fetchData'
import { DateDomainService } from '../../services/DateDomainService'

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(2),

         alignItems: 'center',
      },
   },
   paper: {
      padding: theme.spacing(2),
      alignItems: 'center',
      width: 'auto',
   },
   dot: {
      margin: '0px',
      padding: '0px',
      height: '20px',
      width: '20px',
      float: 'left',
   },
}))

const dateDomainService = new DateDomainService()

const Calendar: FC = () => {
   const classes = useStyles()
   const { matchedSchedules } = useContext(ScheduleContext)

   return (
      <div className={classes.root}>
         <Paper className={classes.paper}>
            <FullCalendar
               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
               initialView={'dayGridMonth'}
               locale="ja" // 日本語化
               aspectRatio={1}
               height="auto"
               selectable={true}
               selectLongPressDelay={0}
               headerToolbar={{
                  left: 'prev,today',
                  center: 'title',
                  right: 'next',
               }}
               displayEventTime={false}
               weekends={true}
               events={matchedSchedules.map((schedule: MatchedSchedule) => {
                  return {
                     title: schedule.matched_member.name,
                     start: dateDomainService.changeUnixTimeToFormattedString(
                        schedule.start_at
                     ),
                     end: dateDomainService.changeUnixTimeToFormattedString(
                        schedule.end_at
                     ),
                  }
               })}
            />
         </Paper>
      </div>
   )
}

export default Calendar
