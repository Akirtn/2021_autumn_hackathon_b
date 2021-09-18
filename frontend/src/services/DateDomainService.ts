export class DateDomainService {
   //日本時間に揃えてunixTimeを返すメソッド
   public getJapanUnixTime(date: Date): number {
      const japanUnixTime = new Date(
         date.getTime() + (date.getTimezoneOffset() + 9 * 60) * 60 * 1000
      ).getTime()
      return japanUnixTime
   }

   //指定日前のunixtimeを返すメソッド
   public getBeforeWeekUnixTime(unixTime: number, day: number): number {
      const returnUnixtime = new Date(
         new Date(unixTime).getTime() - day * 24 * 60 * 60 * 1000
      ).getTime()
      return returnUnixtime
   }

   //unixTimeから分を返すメソッド
   public changeUnixTimeToMinutes(unixTime: number): number {
      const minutes = new Date(unixTime * 1000).getUTCMinutes()
      return minutes
   }

   //unixTimeから時間を返すメソッド
   public changeUnixTimeToHour(unixTime: number): number {
      const hour = new Date(unixTime * 1000).getUTCHours()
      return hour
   }

   //unixTimeからその日のDate型を出すex)8月14日
   public changeUnixTimeToFormatDayOfWeek(unixTime: number): string {
      const date = new Date(unixTime)
      const month = date.getMonth() + 1
      const day = date.getDate()
      const dayOfWeek = date.getDay()
      const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek]
      const text = month + '月' + day + '日' + '(' + dayOfWeekStr + ')'
      return text
   }
}
