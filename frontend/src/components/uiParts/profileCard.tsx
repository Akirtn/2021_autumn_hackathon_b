import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import React, { FC } from 'react'

import Themes from '../../utils/theme'

import ProfileTag from './profileTag'
const useStyles = makeStyles({
   root: {
      minWidth: 190,
      fontWeight: 'bold',
      fontFamily: Themes.font.fontFamily,
   },
   title: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: Themes.font.fontFamily,
   },
})

const ProfileCard: FC<any> = (props) => {
   const { profile } = props
   const classes = useStyles()

   return (
      <Card className={classes.root} variant="outlined">
         <CardContent>
            <div
               style={{
                  fontFamily: Themes.font.fontFamily,
                  fontSize: '16px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
               }}
            >
               <div style={{ padding: '4px 0px' }}>名前：</div>
               <div>{profile.name}</div>
            </div>
            <div>
               <div
                  style={{
                     fontFamily: Themes.font.fontFamily,
                     fontSize: '16px',
                     display: 'flex',
                     flexDirection: 'row',
                     alignItems: 'center',
                  }}
               >
                  <LocalOfferIcon />
                  <div>タグ一覧</div>
               </div>
               <div
                  style={{
                     fontFamily: Themes.font.fontFamily,
                     display: 'flex',
                     flexDirection: 'row',
                     alignItems: 'center',
                  }}
               >
                  {profile.tags.map((tagName: any, i: number) => {
                     return <ProfileTag tagName={tagName} key={'tags' + i} />
                  })}
               </div>
            </div>
         </CardContent>
      </Card>
   )
}

export default ProfileCard
