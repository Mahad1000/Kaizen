import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../../components/FirebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { Line, Bar } from 'react-chartjs-2';
import { subDays, format } from 'date-fns';
import { auth } from '../../components/FirebaseConfig'; 

const SimpleAnalytics = () => {
    const [chartType, setChartType] = useState('Line');
    const [habitsData, setHabitsData] = useState([]);

    useEffect(() => {
        const currentUserId = auth.currentUser?.uid; // Get current user ID
        if (!currentUserId) return;

        const q = query(collection(db, "habits"), where("userId", "==", currentUserId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setHabitsData(data);
        });

        return () => unsubscribe();
    }, []);

    const last7Days = useMemo(() => Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), i), 'yyyy-MM-dd')).reverse(), []);

    const chartData = useMemo(() => {
        const completionData = last7Days.map(date => {
            let totalCompletion = 0;
            let habitCount = 0;

            habitsData.forEach(habit => {
                if (habit.datesCompleted && habit.datesCompleted[date]) {
                    switch (habit.datesCompleted[date]) {
                        case 'complete':
                            totalCompletion += 100;
                            break;
                        case 'partial':
                            totalCompletion += 50; // partial is worth half
                            break;
                        default:
                            break;
                    }
                    habitCount++;
                }
            });

            return habitCount > 0 ? (totalCompletion / (habitCount * 100)) * 100 : 0;
        });

        return {
            labels: last7Days,
            datasets: [{
                label: 'Completion Rate',
                data: completionData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }],
        };
    }, [habitsData, last7Days]);

    const commonOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 100, // completion rate percentage
            },
        },
    };

    return (
        <div>
            <div className="flex justify-center mb-4">
                <button className={`px-4 py-2 rounded ${chartType === 'Line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setChartType('Line')}>Line Chart</button>
                <button className={`px-4 py-2 rounded ${chartType === 'Bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setChartType('Bar')}>Bar Chart</button>
            </div>
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                {chartType === 'Line' ? (
                    <Line data={chartData} options={commonOptions} />
                ) : (
                    <Bar data={chartData} options={commonOptions} />
                )}
            </div>
        </div>
    );
};

export default SimpleAnalytics;
