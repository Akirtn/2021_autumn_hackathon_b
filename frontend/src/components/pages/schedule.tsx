import React, { FC, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import ScheduleTemplate from '../templates/scheduleTemplate'

const Schedule: FC = () => {
   const location = useLocation()
   // ここにユーザ情報入ってます
   console.log(location.state)
   return <ScheduleTemplate />
}

export default Schedule
