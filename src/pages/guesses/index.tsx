import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios'
import { getImageSize } from 'next/dist/server/image-optimizer';
import { JsonWebTokenError } from 'jsonwebtoken';
import CardGame from '../../components/CardGame';

function groupBy(array: any, key: any) {
    return array.reduce((acc: any, item: any) => {

        const group = item[key][0] ? item[key][0].Description : 'Sem Grupo'

        if (!acc[group]) acc[group] = []
        acc[group].push(item)
        return acc
    }, [])
}


const Guesses: NextPage = () => {

    const [games, setGames] = useState<any>(null)


    useEffect(() => {
        (async function () {
            const games = await axios.get('https://api.fifa.com/api/v3/calendar/matches?idCompetition=17&IdSeason=255711')
            setGames(games.data)
        })()

    }, [])


    return (
        <div className="flex flex-col text-white items-center justify-center h-screen bg-gradient-to-r from-green-900 to-gray-900 ">
            <h1>{games && games.Results[0].CompetitionName[0].Description}</h1>
            <div className="flex justify-center w-screen md:p-10 flex-wrap gap-4 text-black">
                {games && games.Results.map((g: any) => <CardGame {...g} />)}
            </div>

            {/* {games && console.log(groupBy(games.Results, 'GroupName'))} */}
        </div>
    )
}

export default Guesses
