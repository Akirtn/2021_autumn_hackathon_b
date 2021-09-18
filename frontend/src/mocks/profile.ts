type UserDataType = {
   name: string
   email: string
   user_id: number
}

type ProfileType = {
   name: string
   email: string
   user_id: number
   friends: UserDataType[]
}

const ProfileData: ProfileType = {
   name: 'asahara',
   email: 'test@gmail.com',
   user_id: 0,
   friends: [
      { name: 'asahara', email: 'test@gmail.com', user_id: 0 },
      { name: 'yoshida', email: 'test@gmail.com', user_id: 1 },
   ],
}

export default ProfileData
