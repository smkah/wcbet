import { FormEvent, useEffect, useState, createElement } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'
import { format, formatISO } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR";

const CardGame = (props: any) => {
    { console.log(props) }

    function handlePoints(hs: any, as: any, gh: any, ga: any) {

        let p = 0;
        if (hs == gh && as == ga) return p = 3;
        if (hs > as && gh > ga) return p = 1;
        if (hs < as && gh < ga) return p = 1;
        if (hs == as && gh == ga) return p = 1;
        return p;

    }

    const [points, setPoints] = useState(0)

    let { TeamName, Home, Away, IdMatch, GroupName, LocalDate, MatchStatus, guess } = props

    useEffect(() => {
        if (guess) setPoints(handlePoints(Home.Score, Away.Score, guess.HomeGuess, guess.AwayGuess))
    }, [])

    const homeFlagUrl = Home && Home.PictureUrl.replace('{format}', 'sq').replace('{size}', '1')
    const awayFlagUrl = Away && Away.PictureUrl.replace('{format}', 'sq').replace('{size}', '1')

    return <div key={IdMatch} className="bg-white rounded p-4" >
        <div className="flex justify-center mb-2 gap-6">
            <b>{GroupName.length > 0 && GroupName[0].Description}</b>
            {format(new Date(LocalDate), "P", { locale: ptBR })}
            {MatchStatus == 0 ? <div className="bg-green-400 rounded-full w-4 h-4"></div> : MatchStatus == 3 ? <div className="bg-yellow-400 rounded-full w-4 h-4 animate-bounce"></div> : <div className="bg-gray-400 rounded-full w-4 h-4"></div>}
        </div>

        <div className="flex gap-2">
            <h1> {Home ? Home.Abbreviation : 'nada'}</h1>
            <img src={homeFlagUrl} alt="" />
            <span className="w-10 font-semibold text-lg text-center border-gray-100 border">{Home && Home.Score}</span>
            {/* <input className="w-10 font-semibold text-lg text-center border-gray-100 border" type="number" min={0} name={`home-${IdMatch}`} id={`home-${IdMatch}`} value={Home && Home.Score} disabled /> */}
            X
            <span className="w-10 font-semibold text-lg text-center border-gray-100 border">{Away && Away.Score}</span>
            {/* <input className="w-10 font-semibold text-lg text-center border-gray-100 border" type="number" min={0} name={`away-${IdMatch}`} id={`away-${IdMatch}`} value={Away && Away.Score} disabled /> */}
            <img src={awayFlagUrl} alt="" />
            <h1 >{Away ? Away.Abbreviation : 'nada'} </h1>
        </div>


        {guess && (
            <small className="flex justify-center gap-2 mt-2">
                <b>Meu Palpite:</b> {guess.HomeISO} <b>{guess.HomeGuess}</b>  X {guess.AwayISO} <b>{guess.AwayGuess}</b> - <b>Pontos: </b><span className="bg-green-800 text-white w-5 h-5 text-center rounded font-bold">{points}</span>
            </small>
        )}
    </div>


}
export default CardGame;
