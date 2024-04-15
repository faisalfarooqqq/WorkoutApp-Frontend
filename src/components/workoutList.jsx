import { useEffect} from 'react';
import axios from 'axios';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import {useAuthContext} from '../hooks/useAuthContext'

function WorkoutList() {
  const { state, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/workouts', 
        { headers: { 'Authorization': `Bearer ${user.token}` } } );
        const fetchedWorkouts = response.data;
        dispatch({ type: 'SET_WORKOUTS', payload: fetchedWorkouts });
      } catch (error) {
        console.log('Error fetching Workouts: ', error);
      }
    };

    if (user) {
      fetchWorkouts();
    }
   
  }, [dispatch, user]);

  const handleDelete = async (id) => {
    if (!user){
      return
    }
    
    try {
        console.log(id);
        await axios.delete(`http://localhost:4000/api/workouts/${id}`, 
        { headers: { Authorization: `Bearer ${user.token}` } })

        dispatch({type: 'DELETE_WORKOUT', payload: id});
        
    } catch (error) {
        console.log('Error deleting Workout: ', error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {state.workouts.map(workout => (
                <div key={workout._id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">{workout.title}</h3>
                    <p className="text-gray-600">Load: {workout.load} Kg</p>
                    <p className="text-gray-600">Reps: {workout.reps}</p>
                    <button onClick={() => handleDelete(workout._id)} className="cursor-pointer text-red-500 hover:text-red-700">DELETE</button>
                </div>
        ))}
            </div>
    </div>
  );
}

export default WorkoutList;
