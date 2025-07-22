import { act, useState } from "react";
import { categories } from "../data/categories";

export default function Form() {

    const [activity, setActivity] = useState({
        category: 1,
        name: '',
        calories: 0
    });

    const handleChange = () => {
        
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
                        <option disabled defaultValue={} value="">-- Seleccione --</option>
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
                onChange={handleChange}
                value={activity.name}
                className="border border-slate-300 p-2 rounded-lg"
                type="text"
                id="activity"
                placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                />
            </div>

             <div className="grid gap-3">
                <label htmlFor="calories" className="font-bold">Calorías:</label>
                <input 
                onChange={handleChange}
                value={activity.calories}
                className="border border-slate-300 p-2 rounded-lg"
                type="number"
                id="calories"
                placeholder="Ej. 300 o 500"
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
