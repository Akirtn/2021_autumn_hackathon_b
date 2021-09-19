import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, FC } from 'react'
import { useHistory } from 'react-router-dom'

import { Api } from '../../action/action'
import Theme from '../../utils/theme'
import Loading from '../Loading'

const useStyles = makeStyles((theme) => ({
   form: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
   },
   button: {
      marginTop: theme.spacing(2),
      backgroundColor: Theme.color.primaryColor,
      color: 'white',
      '&:hover': {
         background: 'white',
         color: Theme.color.primaryColor,
      },
   },
}))

const LoginForm: FC = () => {
   const history = useHistory()
   const classes = useStyles()
   const [emailText, setEmailText] = useState('')
   const [passwordText, setPasswordText] = useState('')
   const [hasError, setHasError] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   const handleSubmit = () => {
      setIsLoading(true)
      Api.login(emailText, passwordText).then((res: any) => {
         if (res) {
            localStorage.setItem('userInfo', JSON.stringify(res))
            history.push({ pathname: '/schedule', state: res })
         } else {
            setHasError(true)
         }
         setIsLoading(false)
      })
   }

   return (
      <Grid
         container
         justifyContent="center"
         alignItems="center"
         className={classes.form}
         spacing={4}
      >
         <Grid item xs={6} sm={6} md={4} lg={4}>
            <TextField
               error={hasError}
               id="email"
               type="email"
               label="Email"
               fullWidth
               onChange={(e: any) => {
                  setEmailText(e.target.value)
               }}
            />
            <TextField
               error={hasError}
               id="password"
               label="Password"
               fullWidth
               onChange={(e: any) => {
                  setPasswordText(e.target.value)
               }}
            />
            <Loading isLoading={isLoading} />
            <Button
               variant="contained"
               className={classes.button}
               onClick={handleSubmit}
            >
               LOGIN
            </Button>
         </Grid>
      </Grid>
   )
}
export default LoginForm
