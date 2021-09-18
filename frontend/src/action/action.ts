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
   singnIn: async () => {
      await axios
         .get(`${api}/signIn`)
         .then(function (response) {
            // handle success
            console.log(response)
         })
         .catch(function (error) {
            // handle error
            console.log(error)
         })
         .finally(function () {
            // always executed
         })
   },
}
