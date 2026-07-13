import React from 'react'
import Canvas from '../../../components/Canvas'

export async function MainCanvas({params}:{params:{roomId : string} }) {
    const {roomId} = await params
      console.log(roomId,"roommmmmmmmmmmmmmmmmIddddddddddddddddd frommmmmmm mmannnnnnnnnnn")

  return (
    <Canvas roomId={roomId} />
  )
}

export default MainCanvas