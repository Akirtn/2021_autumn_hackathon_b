import axios from 'axios'

import {
   UserInfo,
   Members,
   EmptySchedulesType,
   MatchedSchedules,
} from '../mocks/fetchData'

//サーバー接続の切り替え
let api: any
switch (window.location.host) {
   case 'http://localhost:3000':
      api = 'http://dena-hackathon-2021.idichi.tk'
      break
   case '': //本番
      api = 'http://dena-hackathon-2021.idichi.tk'
      break
   default:
      api = 'http://dena-hackathon-2021.idichi.tk'
}

const errorHandler = (error: any) => {
   // handle error
   if (error.response) {
      // レスポンスは返ってくるが 200 番台じゃない場合
      alert(error.response.data)
      alert(error.response.status)
      alert(error.response.headers)
   } else if (error.request) {
      // レスポンスがない場合
      alert(error.request)
   } else {
      // それ以外
      alert('Error' + error.message)
   }
   alert(error.config)
}

export const Api = {
   login: async (
      email: string,
      password: string
   ): Promise<UserInfo | Error> => {
      return await axios
         .post(`${api}/users/login`, {
            email: email,
            password: password,
         })
         .then(function (response) {
            // handle success
            localStorage.setItem('user', response.data)
            return response.data
         })
         .catch(function (error) {
            errorHandler(error)
         })
   },
   writeSchedule: async (
      start_time: string,
      end_time: string
   ): Promise<{ schedule_id: string } | Error> => {
      return await axios
         .post(`${api}/users/empty_schedule`, {
            start_time,
            end_time,
         })
         .then(function (response) {
            // handle success
            return response.data
         })
         .catch(function (error) {
            errorHandler(error)
         })
   },
   getMatchedSchedule: async (): Promise<MatchedSchedules | Error> => {
      return await axios
         .get(`${api}/users/matched_schedule`)
         .then(function (response) {
            // handle success
            return response.data
         })
         .catch(function (error) {
            errorHandler(error)
         })
   },
   matchSchedule: async (): Promise<void | Error> => {
      return await axios
         .post(`${api}/users/matched_schedule`)
         .then(function () {
            // handle success
            return
         })
         .catch(function (error) {
            errorHandler(error)
         })
   },
   getEmptySchedule: async (): Promise<EmptySchedulesType | Error> => {
      return await axios
         .get(`${api}/users/empty_schedule`)
         .then(function (response) {
            // handle success
            return response.data
         })
         .catch(function (error) {
            errorHandler(error)
         })
   },
   getMembers: async (): Promise<Members | Error> => {
      return await axios
         .get(`${api}/users/members`)
         .then(function (response) {
            // handle success
            return response.data
         })
         .catch(function (error) {
            errorHandler(error)
         })
   },
}
