// eslint-disable-next-line import/order
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState, useContext, FC, memo } from 'react'

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

const Calendar: FC = () => {
   const classes = useStyles()

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
               //initialDate={}
               displayEventTime={false}
               weekends={true}
            />
         </Paper>
      </div>
   )
}

export default Calendar
