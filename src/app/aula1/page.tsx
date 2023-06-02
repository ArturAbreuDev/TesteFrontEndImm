'use client'
import { useState } from 'react'
import { useGlobalContext } from '../context/store'
// import aulasData from '../../../public/aulas.json'
// import { useGlobalContext } from '@/app/context/store'
// import Image from 'next/image'

export default function Home() {
  const { useremail } = useGlobalContext()
  console.log(useremail)

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">{useremail}</h1>
    </div>
  )
}
