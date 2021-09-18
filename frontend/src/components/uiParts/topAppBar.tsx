import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { FC, useContext } from 'react'

import { ScheduleContext } from '../pages/schedule'

import CustomSizeAvatar from './customSizeAvatar'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
   },
   appBar: {
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
   const { userInfo, memberList } = useContext(ScheduleContext)
   const avatarSize: { width: string; height: string } = {
      width: '40px',
      height: '40px',
   }
   return (
      <div className={classes.root}>
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
               <CustomSizeAvatar avatarSize={avatarSize} name={userInfo.name} />
            </Toolbar>
         </AppBar>
         <Drawer variant="permanent">
            <div className={classes.toolbar} />
            <List>
               {memberList.map((value: any, index: any) => (
                  <ListItem button key={index}>
                     <ListItemIcon>
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
