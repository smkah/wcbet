import { FormEvent, useEffect, useState } from "react";
import { api } from "../utils/database";

const Form = (props) => {

    const [formData, setFormData] = useState({})

    const { title, name, fields } = props

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const response = await api.post(`${name}/new`, formData)
        console.log(response)
    }
    const handleCHange = (e) => {
        setFormData(oldValue => {
            return { ...oldValue, [e.target.name]: e.target.value }
        })
    }

    return <form className="flex flex-col items-center gap-2" action="">
        {fields.map(e => {
            return <div className="flex-col gap-2">
                <label htmlFor={e.name} className="block text-gray-700">
                    {e.label}
                </label>
                <div className="flex flex-row gap-2 items-center">
                    {e.icon}
                    <input onChange={handleCHange} className={e.classes} {...e} />
                </div>

            </div>
        })}
        <button
            className="w-full py-1 bg-green-900 text-white rounded shadow"
            type="submit"
            onClick={handleSubmit}
        >
            {title}
        </button>
    </form>

}
export default Form;