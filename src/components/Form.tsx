import { FormEvent, useEffect, useState, createElement } from "react";
import { api } from "../utils/api";
import { useRouter } from 'next/router'

const Form = (props: any) => {

    const router = useRouter()
    const [formData, setFormData] = useState({})

    const { title, name, elements } = props

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const v = e.target.value
        alert(v)
        localStorage.setItem('user', e)
        router.push('/guesses')
        // if (Object.keys(e).length > 0) {
        //    const response = await api.post(`${name}/new`, formData)
        //    if (response.data.token) router.push('/dashboard')
        // if (response.data.token) router.push('/dashboard')
        //}
    }
    const handleChange = (e: any) => {
        setFormData((oldValue: any) => {
            if (e.target.value) {
                return { ...oldValue, [e.target.name]: e.target.value }
            } else {
                delete oldValue[e.target.name]
                return { ...oldValue }
            }
        })
    }
    return <form className="flex flex-col items-center gap-2"
        autoComplete="on"
        onSubmit={handleSubmit}
    >

        {elements.map((e: any) => {
            return createElement(
                'div',
                { className: "flex-col gap-2", key: e.id },
                createElement(
                    'label',
                    { className: "block text-gray-700 font-bold" },
                    e.label
                ),
                createElement(
                    'div',
                    { className: "flex flex-row gap-2 items-center" },
                    e.icon,
                    createElement(
                        e.type.name,
                        { ...e.attrs, name: e.name, onChange: handleChange, id: e.name }
                    )
                )
            )
        })}
        <button
            className="w-full py-1 bg-green-900 text-white rounded shadow"
            type="submit"
        >
            {title}
        </button>
    </form>

}
export default Form;