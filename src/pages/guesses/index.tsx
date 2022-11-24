oimport type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios'
import { getImageSize } from 'next/dist/server/image-optimizer';
import { JsonWebTokenError } from 'jsonwebtoken';
import CardGame from '../../components/CardGame';

import guesses from '../../assets/guesses.json'

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
    const [user, setUser] = useState<any>(null)

    useEffect(() => {

        setUser(localStorage.getItem('user'));

        (async function () {
            const games = await axios.get('https://api.fifa.com/api/v3/calendar/matches?language=pt&idCompetition=17&IdSeason=255711')
            setGames(games.data)
        })()

    }, [])


    return (
        <div className="flex flex-col text-white items-center justify-center bg-gradient-to-r from-green-900 to-gray-900 ">
            <h1>{games && games.Results[0].CompetitionName[0].Description}</h1>
            <div className="flex justify-center w-screen md:p-10 flex-wrap gap-4 text-black">
                {games && games.Results.map((g: any) => {
                    const guess = guesses.filter((gs: any) => {
                        return g.Home && g.Home.Abbreviation == gs.HomeISO && g.Away.Abbreviation && g.Away.Abbreviation == gs.AwayISO && gs.user == user
                    })
                    console.log(guess)
                    return <CardGame {...g} guess={guess[0]} />
                })}
            </div>
            {/* {console.log(games)} */}

            {/* {games && console.log(groupBy(games.Results, 'GroupName'))} */}
        </div>
    )
}

export default Guesses
