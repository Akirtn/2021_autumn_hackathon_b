import axios from 'axios'

//サーバー接続の切り替え
let api: any
switch (window.location.host) {
   case 'http://localhost:3000':
      api = 'http://localhost:5000'
      break
   case '': //本番
      api = ''
      break
   default:
      api = 'http://localhost:5000'
}

export const Api = {
   signIn: async (email: string, password: string) => {
      return await axios
         .post(`${api}/signIn`, {
            email: email,
            password: password,
         })
         .then(function (response) {
            // handle success
            return response.data
         })
         .catch(function (error) {
            // handle error
            if (error.response) {
               // レスポンスは返ってくるが 200番台じゃない場合
               alert(error.response.data)
               alert(error.response.status)
               alert(error.response.headers)
            } else if (error.request) {
               // レスポンスがない場合
               alert(error.request)
            } else {
               // それ以外
               alert(error.message)
            }
            alert(error.config)
         })
   },
}
