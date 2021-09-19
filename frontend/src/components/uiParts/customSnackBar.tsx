import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert, { Color, AlertProps } from '@material-ui/lab/Alert'
import React, { useState, FC } from 'react'

type Props = {
   message: string
   severity: any
}

type AlertMyProps = {
   children?: React.ReactNode
} & AlertProps

const Alert: React.FC<AlertMyProps> = (props) => {
   return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      '& > * + *': {
         marginTop: theme.spacing(2),
      },
   },
}))

const CustomizedSnackBar: FC<Props> = (props) => {
   const classes = useStyles()
   const [open, setOpen] = useState<boolean>(true)

   const { message, severity } = props

   const handleClose = (event: any, reason?: string) => {
      if (reason === 'clickaway') {
         return
      }
      // console.log('handleClick')
      setOpen(false)
   }

   return (
      <>
         <div className={classes.root}>
            <Snackbar
               open={open}
               autoHideDuration={3000}
               onClose={handleClose}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
               <Alert
                  onClose={(event) => {
                     handleClose(event)
                  }}
                  severity={severity}
               >
                  {message}
               </Alert>
            </Snackbar>
         </div>
      </>
   )
}
export default CustomizedSnackBar
