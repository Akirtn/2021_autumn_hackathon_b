import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done'
import FaceIcon from '@material-ui/icons/Face'
import LabelIcon from '@material-ui/icons/Label'
import React, { FC } from 'react'

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
         margin: theme.spacing(0.5),
      },
   },
}))

const ProfileTag: FC<any> = (props) => {
   const classes = useStyles()
   const { tagName } = props

   return (
      <div className={classes.root}>
         <Chip label={tagName} color="primary" />
      </div>
   )
}
export default ProfileTag
