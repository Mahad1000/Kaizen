import React from 'react';
import HabitForm from './HabitForm';
import { useHabits } from './HabitsContext';

const Habits = () => {
    const { loading, error, habits, deleteHabit } = useHabits();

    const handleDelete = async (habitId) => {
        if (window.confirm('Are you sure you want to delete this habit?')) {
            await deleteHabit(habitId);
        }
    };

    // Function to transform the frequency object into a string of days
    const formatFrequency = (frequency) => {
        if (!frequency) return 'Not specified'; // handle undefined or null frequency
        return Object.entries(frequency)
            .filter(([_, isScheduled]) => isScheduled)
            .map(([day, _]) => day)
            .join(', ');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">Create New Habit</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Add New Habit</h2>
                    <HabitForm />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold mb-4">Your Habits</h2>
                    {loading ? (
                        <p className="text-center">Loading habits...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">Error: {error.message}</p>
                    ) : habits.length === 0 ? (
                        <p className="text-center">You have no habits yet. Create one!</p>
                    ) : (
                        <ul>
                            {habits.map(habit => (
                                <li key={habit.id} className="mb-4 flex justify-between items-center border border-gray-200 rounded-lg p-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{habit.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{habit.description}</p>
                                        <p className="text-sm text-gray-600">Frequency: {formatFrequency(habit.frequency)}</p>
                                    </div>
                                    <button onClick={() => handleDelete(habit.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Habits;
