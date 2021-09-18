import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert, { Color, AlertProps } from '@material-ui/lab/Alert'
import React, { useState, FC } from 'react'

type Props = {
   message: string
   isSucceeded: boolean
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
   const { message, isSucceeded } = props
   const [openSnackBar, setOpenSnackBar] = useState<boolean>(true)

   const handleClose = (event: any, reason?: string) => {
      if (reason === 'clickaway') {
         return
      }
      setOpenSnackBar(false)
   }

   const severity: Color = isSucceeded ? 'success' : 'error'

   return (
      <>
         <div className={classes.root}>
            <Snackbar
               open={openSnackBar}
               autoHideDuration={3000}
               onClose={handleClose}
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
