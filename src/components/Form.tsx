import { useEffect, useState} from "react";
import type { ChangeEvent, FormEvent, Dispatch } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions } from "../reducers/activity-reducer";
import {v4 as uuidv4} from "uuid";


type FormProps = {
    dispatch: Dispatch<ActivityActions>
    activityEdit: Activity
};

const initialActivity : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
};


export default function Form({dispatch, activityEdit} : FormProps ) {

    useEffect( () => {
        if(activityEdit.id) setActivity(activityEdit);

    }, [activityEdit]);

    const [activity, setActivity] = useState<Activity>(initialActivity);

    const [submitText, setSubmitText] = useState('');

    const handleChange = (e : ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        const input = e.target.id;
        const value = e.target.value;

        const isNumberField = ['category', 'calories'].includes(input);

        setActivity({
            ...activity,
            [input]: isNumberField ? +value : value
        });
    };

    const isValidActivity = () => {
        const {name, calories} = activity;
        return name.trim() !== '' && calories > 0
    };

    useEffect(() => {

        let textSubmit = '';

        categories.forEach(category => {
            if(category.id === activity.category){
                textSubmit = `Guardar ${category.name}`;
            };
        });

        setSubmitText(textSubmit);

    }, [activity.category]);


    const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({type : 'save-activity', payload: {newActivity: activity}});

        setActivity({...initialActivity, id: uuidv4()});
    };

  return (
    <>
        <form 
            action="" className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select 
                value={activity.category}
                onChange={(handleChange)}
                name="" id="category"
                className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {categories.map((category) => (
                        <option 
                            id={category.name}
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
            id="submit-form"
            type="submit" 
            className="bg-gray-800 hover:bg-gray-900 w-full disabled:opacity-10 disabled:cursor-auto p-2 text-white font-bold uppercase cursor-pointer"
            value={submitText}
            disabled={!isValidActivity()}

            />
        </form>
    </>
)
}
