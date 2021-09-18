type Theme = {
   color: {
      primaryColor: string
      secondaryColor: string
      greyColor: string
   }
   font: {
      fontFamily: string
   }
   background: {
      primaryColor: string
   }
}

const Theme: Theme = {
   color: {
      primaryColor: '#094067',
      secondaryColor: '#ef4565',
      greyColor: '#5f6c7b',
   },
   font: {
      fontFamily:
         "'Avenir', 'Helvetica Neue', 'Helvetica', 'Arial', 'Hiragino Sans', 'ヒラギノ角ゴシック', YuGothic, 'Yu Gothic', 'メイリオ', Meiryo, 'ＭSＰゴシック', 'MS PGothic', sans-serif",
   },
   background: {
      primaryColor: '#fff',
   },
}

export default Theme
