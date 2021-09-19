import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import React, { FC } from 'react'
import Theme from '../utils/theme'

type Props = {
   isLoading: boolean
}

const useStyles = makeStyles(() => ({
   root: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: '100%',
      transform: 'translate(-50%, -50%)',
      height: screen.height,
      opacity: '0.5',
      zIndex: 1,
      backgroundColor: Theme.color.greyColor,
   },
   circle: {
      color: Theme.color.primaryColor,
      position: 'absolute',
      left: window.innerWidth * 0.5 - 24,
      top: screen.height * 0.5 - 40,
   },
}))

const Loading: FC<Props> = ({ isLoading }: { isLoading: boolean }) => {
   const classes = useStyles()

   return (
      <>
         {isLoading && (
            <div className={classes.root}>
               <CircularProgress size={80} className={classes.circle} />
            </div>
         )}
      </>
   )
}

export default Loading
