import Avatar from '@material-ui/core/Avatar'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { FC } from 'react'

type Props = {
   name: string
   avatarSize: MakeProps
}

type MakeProps = {
   width: string
   height: string
}

const useStyles = makeStyles<Theme, MakeProps>((theme) => ({
   root: {
      display: 'flex',
      '& > *': {
         margin: theme.spacing(1),
      },
      cursor: 'pointer',
   },
   size: {
      width: (avatarSize) => avatarSize.width,
      height: (avatarSize) => avatarSize.height,
   },
}))

const CustomSizeAvatar: FC<Props> = (props) => {
   const { avatarSize, name } = props
   const classes = useStyles(avatarSize)

   return (
      <div className={classes.root}>
         <Avatar className={classes.size}>{name.split('')[0]}</Avatar>
      </div>
   )
}

export default CustomSizeAvatar
