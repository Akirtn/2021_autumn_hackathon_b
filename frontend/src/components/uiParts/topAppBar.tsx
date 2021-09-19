import AppBar from '@material-ui/core/AppBar'
import Card from '@material-ui/core/Card'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Popper from '@material-ui/core/Popper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { FC, useContext } from 'react'

import Theme from '../../utils/theme'
import { ScheduleContext } from '../pages/schedule'

import CustomSizeAvatar from './customSizeAvatar'
import ProfileCard from './profileCard'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      fontFamily: Theme.font.fontFamily,
   },
   appBar: {
      fontFamily: Theme.font.fontFamily,
      backgroundColor: Theme.color.primaryColor,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   title: {
      flexGrow: 1,
      fontWeight: 'bold',
      fontFamily: Theme.font.fontFamily,
   },
   toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
   },
}))

const TopAppBar: FC = (props) => {
   const classes = useStyles()
   const [selectProfle, setSelectProfle] = React.useState([])
   const [profileAnchorEl, setProfileAnchorEl] = React.useState(null)
   const [profileOpen, setProfileOpen] = React.useState(false)

   const { userInfo, memberList } = useContext(ScheduleContext)
   const avatarSize: { width: string; height: string } = {
      width: '40px',
      height: '40px',
   }

   const mouseOver = (value: any) => (event: any) => {
      setProfileAnchorEl(event.currentTarget)
      setSelectProfle(value)
      setProfileOpen(true)
   }

   const mouseOut = () => {
      setProfileAnchorEl(null)
      setProfileOpen(false)
   }
   return (
      <div className={classes.root}>
         <Popper
            open={profileOpen}
            anchorEl={profileAnchorEl}
            placement={'top'}
            style={{ zIndex: 30000 }}
         >
            <ProfileCard profile={selectProfle} />
         </Popper>
         <CssBaseline />
         <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
               [classes.appBarShift]: false,
            })}
         >
            <Toolbar>
               <Typography variant="h6" noWrap className={classes.title}>
                  スケジュール管理
               </Typography>
               <div
                  onMouseOver={mouseOver(userInfo)}
                  onMouseOut={() => {
                     mouseOut()
                  }}
               >
                  <CustomSizeAvatar
                     avatarSize={avatarSize}
                     name={userInfo.name}
                  />
               </div>
            </Toolbar>
         </AppBar>
         <Drawer variant="permanent">
            <div className={classes.toolbar} />
            <List>
               <ListItem
                  style={{
                     fontWeight: 'bold',
                     fontSize: '11px',
                     fontFamily: Theme.font.fontFamily,
                     display: 'flex',
                     justifyContent: 'center',
                  }}
               >
                  仲良くな
                  <br />
                  れるかも?
               </ListItem>
               {memberList.map((value: any, index: any) => (
                  <ListItem button key={index}>
                     <ListItemIcon
                        onMouseOver={mouseOver(value)}
                        onMouseOut={() => {
                           mouseOut()
                        }}
                     >
                        <CustomSizeAvatar
                           avatarSize={avatarSize}
                           name={value.name}
                        />
                     </ListItemIcon>
                  </ListItem>
               ))}
            </List>
         </Drawer>
         <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
         </main>
      </div>
   )
}

export default TopAppBar
