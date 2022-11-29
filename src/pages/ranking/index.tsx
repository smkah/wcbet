import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios'
import { getImageSize } from 'next/dist/server/image-optimizer';

import guesses from '../../assets/guesses.json'



const Ranking: NextPage = () => {

    function groupBy(array: any, key: any) {
        return array.reduce((acc: any, item: any) => {

            const user = item[key];

            if (!acc[user]) acc[user] = []
            acc[user].points = 1
            return acc
        }, [])
    }

    const [games, setGames] = useState<any>(null)
    const [ranking, setRanking] = useState<any>(null)

    useEffect(() => {

        const r = groupBy(guesses, "user")
        setRanking(r);
        (async function () {
            const games = await axios.get('https://api.fifa.com/api/v3/calendar/matches?language=pt&idCompetition=17&IdSeason=255711')
            setGames(games.data)
        })()

    }, []);

    // let ranking = guesses.reduce((group: any, gs: any) => {
    //     let newkey: any = gs['user']
    //     if (!group[newkey]) {
    //         group[newkey] = []
    //     }

    //const game = games.Results.filter((g: any) => {
    //    return g.Home && g.Home.Abbreviation == gs.HomeISO && g.Away.Abbreviation && g.Away.Abbreviation == gs.AwayISO
    // })

    //@ts-ignore
    //     group[newkey].push({ points: 1 })
    //     return group
    // }, []);

    return (
        <div className="flex flex-col text-white items-center justify-center bg-gradient-to-r from-green-900 to-gray-900 ">
            <h1>{games && games.Results[0].CompetitionName[0].Description}</h1>
            {/* <div className="flex justify-center w-screen md:p-10 flex-wrap gap-4 text-white">

                {ranking && ranking.map((u: any) => {
                    //@ts-ignore
                    return <>{u.points}</>
                })}
            </div> */}
            {ranking && JSON.stringify(ranking.smkah)}
        </div>
    )
}

export default Ranking
