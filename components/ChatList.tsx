import { authOptions } from '@/auth'
import { getDoc } from 'firebase/firestore'
import { getServerSession } from 'next-auth'
import React from 'react'

const ChatList = async () => {
    const session = await getServerSession(authOptions)

    // const chatSnapShot = await getDoc(
    //     chatMembersCollectionRef(session?.user.id)
    // )
  return (
    <div>ChatList</div>
  )
}

export default ChatList