import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Form from '../components/Form'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const forms = [
  {
    title: 'Login', name: 'login', elements: [
      { id: 1, label: 'Apelido', name: 'nick', icon: <FaUser />, type: { name: 'input' }, attrs: { classes: 'block w-full flex-1 rounded-r-md border-gray-100 focus:border-green-500 focus:ring-green-500', type: 'text', placeholder: "Digite seu apelido", required: true, }, },
      // { id: 2, label: 'Senha', name: 'password', icon: <FaLock />, type: { name: 'input' }, attrs: { classes: 'block w-full flex-1 rounded-none rounded-r-md border-gray-100 focus:border-green-500 focus:ring-green-500', type: 'password', placeholder: "Digite a senha", required: true, }, },
    ]
  },
  {
    title: 'Registrar', name: 'register', elements: [
      { id: 4, label: 'Nome', name: 'name', icon: <FaUser />, type: { name: 'input' }, attrs: { classes: 'block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-green-500 focus:ring-green-500', type: 'text', placeholder: "Digite o nome", required: true } },
      { id: 5, label: 'E-mail', name: 'email', icon: <FaEnvelope />, type: { name: 'input' }, attrs: { classes: 'block w-full flex-1 rounded-r-md border-gray-100 focus:border-green-500 focus:ring-green-500', type: 'email', placeholder: "Digite o e-mail", required: true }, },
      // { id: 6, label: 'Senha', name: 'password', icon: <FaLock />, type: { name: 'input' }, attrs: { classes: 'block w-full flex-1 rounded-none rounded-r-md border-gray-100 focus:border-green-500 focus:ring-green-500', type: 'password', placeholder: "Digite a senha", required: true, }, },
      // { id: 7, label: 'Confirme a senha', name: 'verify-password', icon: <FaLock />, type: { name: 'input' }, attrs: { classes: 'block w-full flex-1 rounded-none rounded-r-md border-gray-100 focus:border-green-500 focus:ring-green-500', type: 'password', placeholder: "Repita a senha", required: true, }, },
    ]
  },
]

const Home: NextPage = () => {

  const [registred, setRegistred] = useState(true)

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-900 to-gray-900 ">
      <div className="flex flex-col md:flex-row items-center gap-6">

        {/* <div className="flex flex-col items-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/pt/thumb/e/e3/2022_FIFA_World_Cup.svg/200px-2022_FIFA_World_Cup.svg.png"
            alt="logo copa 2022 qatar"
            width="150"
            height="150"
          />
          <h1 className="text-white text-3xl font-semibold">Bolão da Copa</h1>
          <h6 className="text-white italic">Uhhul! Façam suas apostas!</h6>

        </div> */}

        <div className="flex flex-col bg-white shadow rounded p-4 gap-2">
          <div className="p-2 rounded w-full">
            {registred ? <><Form {...forms[0]} /><span className="text-xs">Faça <a className="font-bold cursor-pointer" onClick={() => { setRegistred(false) }}>aqui</a> o seu registro.</span></> : <Form {...forms[1]} />}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Home
