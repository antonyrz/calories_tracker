import { useMemo } from "react";
import type { Activity } from "../types";
import type { Dispatch } from "react";
import { categories } from "../data/categories";
import {PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import type { ActivityActions } from "../reducers/activity-reducer";
import Swal from "sweetalert2";

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
};


export default function ActivityList({activities, dispatch} : ActivityListProps) {

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities]);

    const categoryName = useMemo(() => 
        (category : Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
    , [activities]);

    function confirmDelete(id : Activity['id']){

        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podras reversar esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Eliminar!",
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Eliminado!",
                text: "Actividad eliminada",
                icon: "success"
            });

            dispatch({type: 'delete-activity', payload: {idActivity: id}});

            setTimeout(() => {
                document.querySelector('.swal2-container')?.remove();
            }, 2000);

            };
          });
    };

  return (
    <>
        <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades</h2>
        
        <div className={`grid gap-10 ${isEmptyActivities ? 'grid-cols-1' : 'grid-cols-2'}`}>

        {isEmptyActivities ? 
        
            <p className="text-center my-5">No hay actividadades aún</p> : 


                activities.map(activity => (
                        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
                            <div className="space-y-2 relative">
                                <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold shadow ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                                    {categoryName(+activity.category)}
                                </p>

                                <p className="text-2xl font-bold pt-5">
                                    {activity.name}
                                </p>
                                
                                <p className="font-black text-4xl text-lime-500">
                                    {activity.calories} {''}
                                    <span>Calorias</span>
                                </p>
                            </div>

                            <div className="flex gap-5 items-center">
                                <button>
                                    <PencilSquareIcon
                                        className="cursor-pointer h-8 w-8 text-gray-800"
                                        onClick={() => dispatch({type: 'edit-activity', payload: {activity: activity}})}
                                    />
                                </button>

                                <button>
                                    <XCircleIcon
                                        className="cursor-pointer h-8 w-8 text-red-800"
                                        onClick={() => confirmDelete(activity.id)}
                                    //  onClick={() => dispatch({type: 'delete-activity', payload: {idActivity: activity.id}})}
                                    />
                                </button>
                            </div>
                        </div>
                ))}
            </div>
    </>
  )
}
