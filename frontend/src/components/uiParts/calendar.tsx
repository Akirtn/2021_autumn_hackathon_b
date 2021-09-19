// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import React, { useEffect, useState, useContext, FC, memo } from 'react'

import { FormatScheduleService } from '../../services/FormatScheduleService'
import { ScheduleContext } from '../pages/schedule'

const formatScheduleService = new FormatScheduleService()
const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(2),

         alignItems: 'center',
      },
   },
   paper: {
      minWidth: '800px',
      padding: theme.spacing(2),
      alignItems: 'center',
      width: 'auto',
   },
}))

const Calendar: FC = () => {
   const classes = useStyles()
   const {
      selectUnixTime,
      setSelectUnixTime,
      matchedSchedules,
      emptySchedules,
   } = useContext(ScheduleContext)
   const [isReRender, setIsReRender] = useState<boolean>(true)
   const handleSelect = (info: any) => {
      setSelectUnixTime(moment(info.start).unix())
      setIsReRender(false)
   }

   useEffect(() => {
      setIsReRender(true)
   }, [isReRender])

   return (
      <div className={classes.root}>
         <Paper className={classes.paper}>
            <FullCalendar
               plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
               ]}
               initialView={'dayGridMonth'}
               locale="ja" // 日本語化
               aspectRatio={1}
               height="auto"
               selectable={true}
               selectLongPressDelay={0}
               headerToolbar={{
                  left: 'prev',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek, next',
               }}
               select={handleSelect}
               events={[
                  ...formatScheduleService.getFormattedEmptySchedules(
                     emptySchedules
                  ),
                  ...formatScheduleService.getFormattedMatchedSchedules(
                     matchedSchedules
                  ),
               ]}
               initialDate={moment(selectUnixTime * 1000).format()}
               displayEventTime={false}
               weekends={true}
            />
            {isReRender && (
               <FullCalendar
                  plugins={[listPlugin]}
                  initialView={'listDay'}
                  locale="ja" // 日本語化
                  aspectRatio={1}
                  height="auto"
                  selectable={false}
                  selectLongPressDelay={0}
                  headerToolbar={false}
                  listDayFormat={{
                     month: 'long',
                     year: 'numeric',
                     day: 'numeric',
                     weekday: 'long',
                  }}
                  listDaySideFormat={false}
                  events={formatScheduleService.getFormattedMatchedSchedules(
                     matchedSchedules
                  )}
                  initialDate={moment(selectUnixTime * 1000).format()}
                  weekends={true}
               />
            )}
         </Paper>
      </div>
   )
}

export default Calendar
