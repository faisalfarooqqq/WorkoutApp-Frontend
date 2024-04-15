import { useState } from "react";
import axios from 'axios';
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

function AddWorkoutForm() {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const { dispatch } = useWorkoutContext();
    const {user} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user){
            setError('You must be logged in') 
            return
        }
        const workout = { title, load, reps };

        try {
            const response = await axios.post('http://localhost:4000/api/workouts', workout,
            { headers: { Authorization: `Bearer ${user.token}` } }
        );
            const createdWorkout = response.data;
            dispatch({ type: 'CREATE_WORKOUT', payload: createdWorkout });
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
        } catch (error) {
            console.log('Error adding workout: ', error);
            setError(error);
        }
    }

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Add Workout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Load in Kg:</label>
                    <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Reps:</label>
                    <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <button type="submit" className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Add Workout</button>
            </form>
            {/* Error Message */}
            {error && (
            <div className="text-center text-red-500 mt-2">
                {error.message}
            </div>
            )}
      </div>
    )
}

export default AddWorkoutForm;
