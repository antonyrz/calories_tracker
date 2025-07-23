import { useState } from "react";
import type { ChangeEvent } from "react";
import { categories } from "../data/categories";

export default function Form() {

    const [activity, setActivity] = useState({
        category: 1,
        name: '',
        calories: 0
    });

    const handleChange = (e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const key = e.target.id;
        const value = e.target.value;

        setActivity({
            ...activity,
            [key]: value
        })
    }

  return (
    <>
        <form action="" className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select 
                value={activity.category}
                onChange={handleChange}
                name="" id="category"
                className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {categories.map((category) => (
                        <option 
                            key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-3">
                <label htmlFor="activity" className="font-bold">Actividad:</label>
                <input 
                className="border border-slate-300 p-2 rounded-lg"
                type="text"
                id="name"
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                value={activity.name}
                onChange={handleChange}
                />
            </div>

             <div className="grid gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input 
                className="border border-slate-300 p-2 rounded-lg"
                type="number"
                id="calories"
                placeholder="Ej. 300 o 500"
                value={activity.calories}
                onChange={handleChange}
                />
            </div>

            <input 
            type="submit" 
            className="bg-gray-800 hover:bg-gray-900 w-full p-2 text-white font-bold uppercase cursor-pointer"
            value='Guardar comida o ejercicio'
            />
        </form>
    </>
)
}
