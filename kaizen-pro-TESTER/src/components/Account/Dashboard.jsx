import React, { useState, useEffect, useMemo } from 'react';
import { db, auth } from '../../components/FirebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import HabitCard from './HabitCard';
import SimpleAnalytics from './SimpleAnalytics';
import ProgressCircle from './ProgressCircle';
import { format } from 'date-fns';
import CompletionKudos from './CompletionKudos';

const Dashboard = () => {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [habits, setHabits] = useState([]);
    const [showCompletionKudos, setShowCompletionKudos] = useState(false);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (user) {
                setCurrentUserId(user.uid);
                const todayDayShort = format(new Date(), 'EEE'); // Mon,Tues
                const q = query(collection(db, "habits"), where("userId", "==", user.uid));
    
                const unsubscribeHabits = onSnapshot(q, (querySnapshot) => {
                    const allHabits = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
    
                    // Filter habits to show todays
                    const filteredHabits = allHabits.filter(habit => habit.frequency && habit.frequency[todayDayShort]);
    
                    setHabits(filteredHabits);
                });
    
                
                return () => unsubscribeHabits();
            } else {
                setCurrentUserId(null);
                setHabits([]); // Clear habits if there is no user logged in
            }
        });
    
        
        return () => unsubscribeAuth();
    }, []);

    //  completion percentage for today's habits
    const calculateTodayCompletionPercentage = useMemo(() => {
    const totalHabitsToday = habits.length;
    const completionScore = habits.reduce((total, habit) => {
        const completionStatus = habit.datesCompleted[format(new Date(), 'yyyy-MM-dd')];
        if (completionStatus === 'complete') {
            return total + 1; // Full point for complete
        } else if (completionStatus === 'partial') {
            return total + 0.5; // Half point for partial
        }
        return total; // No points for incomplete
    }, 0);

    const completionPercentage = (completionScore / totalHabitsToday) * 100;
    return totalHabitsToday > 0 ? completionPercentage : 0;
}, [habits]);

useEffect(() => {
    if (calculateTodayCompletionPercentage === 100) {
        setShowCompletionKudos(true);
    }
}, [calculateTodayCompletionPercentage]);

console.log("Current User ID:", currentUserId);

    
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap -m-4">
                    <div className="w-full lg:w-5/12 xl:w-5/12 p-4">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Habits</h2>
                                <div className="space-y-4 overflow-y-auto" style={{ maxHeight: '75vh' }}>
                                    {habits.map((habit) => (
                                        <HabitCard key={habit.id} habit={habit} />
                                    ))}
                                </div>
                                <div className="pt-4">
                                    <ProgressCircle completionPercentage={calculateTodayCompletionPercentage} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-7/12 xl:w-7/12 p-4">
                        <SimpleAnalytics habits={habits} />
                    </div>
                </div>
            </div>
            {showCompletionKudos && <CompletionKudos onClose={() => setShowCompletionKudos(false)} />}
        </div>
    );
};

export default Dashboard;
