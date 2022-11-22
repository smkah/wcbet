import { FormEvent, useEffect, useState, createElement } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'

const CardGame = (props: any) => {

    let { TeamName, Home, Away, IdMatch } = props

    console.log(props)

    const homeFlagUrl = Home && Home.PictureUrl.replace('{format}', 'sq').replace('{size}', '1')
    const awayFlagUrl = Away && Away.PictureUrl.replace('{format}', 'sq').replace('{size}', '1')

    return <div key={IdMatch} className="bg-white rounded p-4" >
        <div className="flex gap-2">

            <h1> {Home ? Home.Abbreviation : 'nada'}</h1>
            <img src={homeFlagUrl} alt="" />
            <input className="w-10 font-semibold text-lg text-center border-gray-100 border" type="number" min={0} name={`home-${IdMatch}`} id={`home-${IdMatch}`} />
            X
            <input className="w-10 font-semibold text-lg text-center border-gray-100 border" type="number" min={0} name={`away-${IdMatch}`} id={`away-${IdMatch}`} />
            <img src={awayFlagUrl} alt="" />
            <h1 >{Away ? Away.Abbreviation : 'nada'} </h1>

        </div>
    </div>

}
export default CardGame;

// https://products.aspose.com/cells/net/conversion/xlsx-to-json/