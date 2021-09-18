import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import CopyIcon from '@material-ui/icons/FileCopy'
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import React, { FC, useState, useContext } from 'react'

import { Api } from '../../action/action'
import { ScheduleContext } from '../pages/schedule'

import CustomizedSnackBar from './customSnackBar'

const useStyles = makeStyles((theme) => ({
   root: {
      width: '394px',
      display: 'flex',
      flexDirection: 'column',
      margin: '20px',
      padding: '16px',
   },
   container: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
   },
   title: {
      fontSize: '16px',
   },
   button: {
      display: 'flex',
      marginLeft: 'auto',
   },
   textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 150,
   },
}))

const SchedulePostForm: FC = (props) => {
   const classes = useStyles()
   const { selectUnixTime } = useContext(ScheduleContext)
   const [startTime, setStartTime] = useState(moment().format('HH:mm'))
   const [endTime, setEndTime] = useState(moment().format('HH:mm'))
   const [openSnackBar, setOpenSnackBar] = useState<boolean>(false)

   const handleStartDateChange = (event: any) => {
      setStartTime(event.target.value)
   }
   const handleEndDateChange = (event: any) => {
      setEndTime(event.target.value)
   }
   const handleWriteSchedule = async () => {
      const unixStartTime = moment(
         moment(selectUnixTime).format(`YYYY/MM/DD ${startTime}`)
      ).unix()
      const unixEndTime = moment(
         moment(selectUnixTime).format(`YYYY/MM/DD ${endTime}`)
      ).unix()
      await Api.writeSchedule(String(unixStartTime), String(unixEndTime)).then(
         (res) => {
            if (res) {
               setOpenSnackBar(true)
            }
         }
      )
   }

   return (
      <Card className={classes.root}>
         <div className={classes.title}>
            {moment(selectUnixTime * 1000).format('YYYY/MM/DD')}
         </div>
         <form className={classes.container} noValidate autoComplete="off">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <Grid>
                  <TextField
                     id="time"
                     label="開始時間"
                     value={startTime}
                     onChange={handleStartDateChange}
                     type="time"
                     margin="normal"
                     className={classes.textField}
                     InputLabelProps={{
                        shrink: true,
                     }}
                     inputProps={{
                        step: 300,
                     }}
                  />
               </Grid>
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <Grid>
                  <TextField
                     id="time"
                     label="終了時間"
                     margin="normal"
                     type="time"
                     className={classes.textField}
                     value={endTime}
                     onChange={handleEndDateChange}
                     InputLabelProps={{
                        shrink: true,
                     }}
                     inputProps={{
                        step: 300,
                     }}
                  />
               </Grid>
            </MuiPickersUtilsProvider>
         </form>
         <div className={classes.button}>
            <Button color="primary" onClick={handleWriteSchedule}>
               投稿
            </Button>
         </div>
         {openSnackBar && (
            <CustomizedSnackBar
               message={'投稿しました'}
               severity={'success'}
               openSnackBar={openSnackBar}
               setOpenSnackBar={setOpenSnackBar}
            />
         )}
      </Card>
   )
}

export default SchedulePostForm
