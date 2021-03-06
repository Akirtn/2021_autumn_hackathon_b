import { makeStyles, Theme } from '@material-ui/core/styles'
import moment from 'moment'
import React, { FC } from 'react'

import Calendar from '../uiParts/calendar'
import SchedulePostForm from '../uiParts/schedulePostForm'
import TopAppBar from '../uiParts/topAppBar'

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   content: {
      margin: '-24px 0px 0px 60px',
   },
}))
const ScheduleTemplate: FC = () => {
   const classes = useStyles()

   return (
      <div className={classes.root}>
         <TopAppBar>
            <div className={classes.content}>
               <Calendar />
               <SchedulePostForm />
            </div>
         </TopAppBar>
      </div>
   )
}
export default ScheduleTemplate
