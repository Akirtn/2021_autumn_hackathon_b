// Read Only
export const Routes = {
   signIn: { title: 'ログイン', path: '/schedule' },
   schedule: { title: 'スケジュール', path: '/schedule' },
} as const

export type Routes = typeof Routes[keyof typeof Routes]
