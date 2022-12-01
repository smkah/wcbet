import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, FaUser, FaTrophy } from 'react-icons/fa';
import axios from 'axios'

import guesses from '../../assets/guesses.json'

const Ranking: NextPage = () => {
    const [games, setGames] = useState<any>([])
    const [ranking, setRanking] = useState<any>(null)
    const [isLoading, setLoading] = useState(false)
    const [nameCompetition, setName] = useState('')

    useEffect(() => {
        setLoading(true);
        (async function getGames() {
            const { data } = await axios.get('https://api.fifa.com/api/v3/calendar/matches?language=pt&idCompetition=17&IdSeason=255711')
            setGames(data.Results)
            setName(data.Results[0].CompetitionName[0].Description)
            setLoading(false);
        })()
    }, [])

    useEffect(() => {
        let r = groupBy(guesses, "user")
        r = Object.values(r).sort((a: any, b: any) => b.points - a.points);
        setRanking(r);
    }, [isLoading])

    function groupBy(array: any, key: any) {

        return array.reduce((acc: [any], item: any) => {

            const user = item[key];

            if (!acc[user]) acc[user] = { user, points: 0 }

            const [game] = games.filter((g: any) => {
                return g.Home && g.Home.Abbreviation == item.HomeISO && g.Away.Abbreviation && g.Away.Abbreviation == item.AwayISO && item.user == user
            })

            if (game) {
                const p = game.MatchStatus == 0 ? handlePoints(game.Home.Score, game.Away.Score, item.HomeGuess, item.AwayGuess) : 0
                acc[user]['points'] = acc[user]['points'] + p;
            }

            return acc
        }, {})
    }

    function handlePoints(hs: any, as: any, gh: any, ga: any) {

        let p = 0;
        if (hs == gh && as == ga) return p = 3;
        if (hs > as && gh > ga) return p = 1;
        if (hs < as && gh < ga) return p = 1;
        if (hs == as && gh == ga) return p = 1;
        return p;

    }

    return (
        <div className="flex flex-col h-screen text-white items-center justify-center bg-gradient-to-r from-green-900 to-gray-900 ">
            <h1 className='font-bold text-lg my-10'>{nameCompetition}</h1>
            <h1 className='font-bold mb-5'>Ranking</h1>
            {!isLoading ? Object.values(ranking).map((r: any, k) => {
                return <div key={k} className="bg-white rounded px-4 py-2  w-screen lg:w-1/6 mb-2" >
                    <div className="flex gap-2 text-black items-center justify-evenly">
                        <h1 className='font-bold'>{k + 1}º</h1>
                        <span className='uppercase'>{r.user}</span>
                        <span className='bg-green-800 rounded text-white px-2 py-1'>{r.points}</span>
                        {k == 0 ? <FaTrophy className='text-yellow-500 w-7 h-7' /> : k == 1 ? <FaTrophy className='text-gray-500 w-6 h-6' /> : k == 2 ? <FaTrophy className='text-yellow-800 w-5 h-5' /> : null}
                    </div>
                </div>
            }) : <p className='text-white font-bold text-lg'>Carregando...</p> }
        </div>
    )
}

export default Ranking
