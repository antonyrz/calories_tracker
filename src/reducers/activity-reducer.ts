import type { Activity } from "../types";

export type ActivityActions = 
    {type: 'save-activity', payload: {newActivity : Activity}} |
    {type: 'edit-activity', payload: {activity : Activity}} |
    {type: 'delete-activity', payload: {idActivity: Activity['id']}} |
    {type: 'restart-app'}

type ActivityState = {
    activities : Activity[],
    activityEdit : Activity,
};

const initialActivityEdit = {
        id: '',
        category: 1,
        name: '',
        calories: 0,
        date: new Date()
}

const localStorageActivities = () : Activity[] => {
    const activites = localStorage.getItem('activities');


    return activites ? JSON.parse(activites) : [];
};

export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activityEdit: initialActivityEdit
};

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) => {
    
        if(action.type === 'save-activity'){
            /// Este codigo maneja la logica para actualizar el state

            const actualActivity = action.payload.newActivity;
            const activityExists = state.activities.some(activity => activity.id === action.payload.newActivity.id);
            let updatedActivities : Activity[] = [];

            if(activityExists){
                updatedActivities = state.activities.map(activity => activity.id === actualActivity.id ? actualActivity : activity);

            }else{
                updatedActivities = [...state.activities, actualActivity];
            };
            
            return{
                ...state,
                activities: updatedActivities,
                activityEdit: initialActivityEdit
           };
        };

        if(action.type === "edit-activity"){
            return{
                ...state,
                activityEdit: action.payload.activity
            };
        };

        if(action.type === "delete-activity"){


            return{
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload.idActivity),
            };
        };

        if(action.type === 'restart-app'){

            console.log('xddd')

            return{
                activities: [],
                activityEdit: initialActivityEdit
            };
        };

        return state;
};