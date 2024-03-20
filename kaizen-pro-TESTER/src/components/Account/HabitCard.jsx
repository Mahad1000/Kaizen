import React from 'react';
import { FiCheckCircle, FiCircle, FiMinusCircle } from 'react-icons/fi';
import { useHabits } from './HabitsContext';
import { format } from 'date-fns';

const HabitCard = ({ habit }) => {
    const { updateHabitCompletion } = useHabits();
    const today = format(new Date(), 'yyyy-MM-dd');

    // Determine the current status or default to 'incomplete'
    const currentStatus = habit.datesCompleted?.[today] ?? 'incomplete';

    const handleCompletionToggle = async () => {
        let newStatus = 'complete'; // Default next status

        // Cycle through the statuses based on current status
        if (currentStatus === 'complete') {
            newStatus = 'incomplete';
        } else if (currentStatus === 'partial') {
            newStatus = 'complete';
        } else if (currentStatus === 'incomplete') {
            newStatus = 'partial';
        }

        // Update the status for the current day
        await updateHabitCompletion(habit.id, today, newStatus);
    };

    // Choose icon based on the current status
    const Icon = () => {
        switch (currentStatus) {
            case 'complete':
                return <FiCheckCircle className="text-green-500" />;
            case 'partial':
                return <FiMinusCircle className="text-yellow-500" />;
            default:
                return <FiCircle className="text-gray-500" />;
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex justify-between items-center space-x-4 p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{habit.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
            </div>
            <button onClick={handleCompletionToggle} className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition duration-150 ease-in-out">
                <Icon />
            </button>
        </div>
    );
};

export default HabitCard;
