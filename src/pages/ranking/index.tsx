import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import axios from 'axios'
import { getImageSize } from 'next/dist/server/image-optimizer';

import guesses from '../../assets/guesses.json'

function groupBy(array: any, key: any) {
    return array.reduce((acc: any, item: any) => {

        const group = item[key][0] ? item[key][0].Description : 'Sem Grupo'

        if (!acc[group]) acc[group] = []
        acc[group].push(item)
        return acc
    }, [])
}


const Ranking: NextPage = () => {

    const [games, setGames] = useState<any>(null)

    useEffect(()=>{

        (async function () {
            const games = await axios.get('https://api.fifa.com/api/v3/calendar/matches?language=pt&idCompetition=17&IdSeason=255711')
            setGames(games.data)
        })()

    }, []);

let ranking = guesses.reduce((group: any, gs: any) => {
  let newkey:any = gs['user']
  if(!group[newkey]){
    group[newkey]=[]
  }

//const game = games.Results.filter((g: any) => {
  //    return g.Home && g.Home.Abbreviation == gs.HomeISO && g.Away.Abbreviation && g.Away.Abbreviation == gs.AwayISO
  // })
//@ts-ignore
  group[newkey].push({points: 1})
  return group
}, []);

    return (
        <div className="flex flex-col text-white items-center justify-center bg-gradient-to-r from-green-900 to-gray-900 ">
            <h1>{games && games.Results[0].CompetitionName[0].Description}</h1>
            <div className="flex justify-center w-screen md:p-10 flex-wrap gap-4 text-black">

                {ranking && ranking.map((u: any) => {
                    //@ts-ignore
                    return <>{u.points}</>
                })}
            </div>
            {guesses && JSON.stringify(groupBy(guesses, "user"))}
        </div>
    )
}

export default Ranking
