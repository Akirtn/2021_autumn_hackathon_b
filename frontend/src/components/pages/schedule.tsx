import React, { FC, useEffect, useState } from 'react'
import ScheduleTemplate from '../templates/scheduleTemplate'
import { useHistory, useLocation } from 'react-router-dom'

const Schedule: FC = () => {
   const location = useLocation()
   // ここにユーザ情報入ってます
   console.log(location.state)
   return <ScheduleTemplate />
}

export default Schedule
