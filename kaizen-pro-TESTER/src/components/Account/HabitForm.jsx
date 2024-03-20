import React, { useState } from 'react';
import { useHabits } from './HabitsContext'; 
import { auth } from '../../components/FirebaseConfig'; 

const HabitForm = () => {
    const { addHabit } = useHabits();
    const [habitName, setHabitName] = useState('');
    const [description, setDescription] = useState('');
    const [metricType, setMetricType] = useState('');
    const [metricValue, setMetricValue] = useState('');
    const [frequency, setFrequency] = useState({
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        Sun: false,
    });
    const defaultMetricOptions = ["Minutes", "Pages", "Litres", "Miles", "Custom"];

    const handleFrequencyChange = (day) => {
        setFrequency(prev => ({ ...prev, [day]: !prev[day] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const filteredFrequency = Object.keys(frequency)
        .filter(day => frequency[day])
        .reduce((acc, day) => ({ ...acc, [day]: true }), {});

const habitData = {
name: habitName.trim(),
description: description.trim(),
metricType: metricType,
metricValue: metricType === "Custom" ? metricValue : null, 
frequency: filteredFrequency,
datesCompleted: {}, 
userId: auth.currentUser.uid 
};

try {
await addHabit(habitData);
resetForm();
} catch (error) {
console.error("Error adding habit: ", error);
}
};

    const resetForm = () => {
        setHabitName('');
        setDescription('');
        setMetricType('');
        setMetricValue('');
        setFrequency({
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
            Sat: false,
            Sun: false,
        });
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="habitName" className="block text-sm font-medium text-gray-700">Habit Name</label>
                    <input
                        id="habitName"
                        type="text"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                        placeholder="Enter Habit Name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the Habit"
                        rows="3"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="metricType" className="block text-sm font-medium text-gray-700">Metric Type</label>
                    <select
                        id="metricType"
                        value={metricType}
                        onChange={(e) => {
                          setMetricType(e.target.value);
                          // Reset metricValue if switching metric types
                          if(e.target.value !== 'Custom') setMetricValue('');
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        <option value="">Select Metric Type</option>
                        {defaultMetricOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                {metricType && (
                    <div>
                        <label htmlFor="metricValue" className="block text-sm font-medium text-gray-700">{metricType === "Custom" ? "Custom Metric Value" : "Metric Value"}</label>
                        <input
                            id="metricValue"
                            type="text"
                            value={metricValue}
                            onChange={(e) => setMetricValue(e.target.value)}
                            placeholder={metricType === "Custom" ? "Enter Custom Metric Value" : "Enter Metric Value"}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                )}
                <fieldset>
                    <legend className="text-sm font-medium text-gray-700">Frequency</legend>
                    <div className="mt-2 grid grid-cols-4 gap-4">
                        {Object.keys(frequency).map(day => (
                            <label key={day} className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={frequency[day]}
                                    onChange={() => handleFrequencyChange(day)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <span>{day}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add Habit
                </button>
            </form>
        </div>
    );
};

export default HabitForm;
