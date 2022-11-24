import { FormEvent, useEffect, useState, createElement } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'

function points (hs:any,as:any,gh:any,ga:any) {
let p = 0;
if (hs==gh && as==ga) return p=3;
if (hs>gh && as>ga) return p=1;
if (hs<gh && as<ga) return p=1;
return p;
}

const CardGame = (props: any) => {

    let { TeamName, Home, Away, IdMatch, guess } = props

    let p = points(+Home.Score, +Away.Score,+guess.HomeGuess,+guess.AwayGuess)

    const homeFlagUrl = Home && Home.PictureUrl.replace('{format}', 'sq').replace('{size}', '1')
    const awayFlagUrl = Away && Away.PictureUrl.replace('{format}', 'sq').replace('{size}', '1')

    return <div key={IdMatch} className="bg-white rounded p-4" >
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
                <b>Meu Palpite:</b> {guess.HomeISO} <b>{guess.HomeGuess}</b>  X {guess.AwayISO} <b>{guess.AwayGuess}</b>. Pontos: {p}
            </small>
        )}
    </div>

}
export default CardGame;

// https://products.aspose.com/cells/net/conversion/xlsx-to-json/
