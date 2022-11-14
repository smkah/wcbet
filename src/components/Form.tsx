import { FormEvent, useEffect, useState, createElement } from "react";
import { api } from "../utils/api";

const Form = (props: any) => {

    const [formData, setFormData] = useState({})

    const { title, name, elements } = props

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const response = await api.post(`${name}/new`, formData)
        console.log(response)
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

    return <form className="flex flex-col items-center gap-2">

        {elements.map((e: any) => {
            return createElement(
                'div',
                { className: "flex-col gap-2" },
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
                        'input',
                        e.props
                    )
                )
            )
        })}

        {/* {fields.map(e => {
            return <div className="flex-col gap-2">
                <label htmlFor={e.name} className="block text-gray-700">
                    {e.label}
                </label>
                <div className="flex flex-row gap-2 items-center">
                    {e.icon}
                    <input onChange={handleChange} className={e.classes} {...e} />
                </div>
            </div>
        })}
        <button
            className="w-full py-1 bg-green-900 text-white rounded shadow"
            type="submit"
            onClick={handleSubmit}
        >
            {title}
        </button> */}
        {JSON.stringify(formData)}
    </form>

}
export default Form;