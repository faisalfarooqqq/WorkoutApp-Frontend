import AddWorkoutForm from "../components/addWorkoutForm";
import Header from "../components/header";
import WorkoutList from "../components/workoutList";
import NavBar from "../components/navBar";

function Home () {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <NavBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-8">Your Workouts</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <WorkoutList />
                    </div>
                    <div>
                        <AddWorkoutForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;