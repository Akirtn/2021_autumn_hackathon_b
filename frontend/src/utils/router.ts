// Read Only
export const Routes = {
   login: { title: 'ログイン', path: '/schedule' },
   schedule: { title: 'スケジュール', path: '/schedule' },
} as const

export type Routes = typeof Routes[keyof typeof Routes]
