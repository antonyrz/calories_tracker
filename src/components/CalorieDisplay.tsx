type CalorieDisplayProps = {
    calories: number,
    text: string,
    type: string
};



export default function CalorieDisplay({calories, text, type} : CalorieDisplayProps) {

    let claseType = '';

    switch(type){
        case 'food': 
            claseType = 'text-lime-500';
            break;
        case 'exercise':
            claseType = 'text-orange-500';
            break;
        case 'totalCalories':
            claseType = 'text-white';
            break;

        default: break;
    };

  return (
    <p className={`font-bold rounded-full grid grid-cols-1 gap-3 text-center text-white`}>
        <span className={`font-black text-6xl ${claseType}`}>{calories}</span>
        {text}
    </p>
  )
}
