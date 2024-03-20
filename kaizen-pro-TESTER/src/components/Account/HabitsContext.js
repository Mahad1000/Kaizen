import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../components/FirebaseConfig';


const HabitsContext = createContext();



function habitsReducer(state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, loading: true, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, habits: action.payload, error: null };
        case 'FETCH_FAILURE':
            return { ...state, loading: false, error: action.payload, habits: [] };
        case 'UPDATE_COMPLETION':
            const updatedHabits = state.habits.map(habit => {
                if (habit.id === action.payload.habitId) {
                    // Update the completion status for the specified date
                    const updatedDatesCompleted = {
                        ...habit.datesCompleted,
                        [action.payload.date]: action.payload.completionStatus
                    };
                    return { ...habit, datesCompleted: updatedDatesCompleted };
                }
                return habit;
            });
            return { ...state, habits: updatedHabits };
        case 'UPDATE_STATUS':
            // update a habit's overall status
            const updatedStatusHabits = state.habits.map(habit => {
                if (habit.id === action.payload.habitId) {
                    return { ...habit, status: action.payload.newStatus };
                }
                return habit;
            });
            return { ...state, habits: updatedStatusHabits };
        default:
            return state;
    }
}

export const HabitsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(habitsReducer, { habits: [], loading: true, error: null });

    useEffect(() => {
        // Listen to live updates from Firestore
        const unsubscribe = onSnapshot(collection(db, "habits"), snapshot => {
            const newHabits = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(habit => habit.userId === auth.currentUser?.uid); // Filter habits by current user ID
            dispatch({ type: 'FETCH_SUCCESS', payload: newHabits });
        }, error => {
            dispatch({ type: 'FETCH_FAILURE', payload: error });
        });

        return () => unsubscribe();
    }, []);

    const addHabit = async (habitData) => {
        dispatch({ type: 'FETCH_INIT' });
        try {
            await addDoc(collection(db, "habits"), { ...habitData, userId: auth.currentUser.uid });
            
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error });
        }
    };

    const deleteHabit = async (habitId) => {
        try {
            await deleteDoc(doc(db, "habits", habitId));
            
        } catch (error) {
            console.error("Error deleting habit:", error);
            
        }
    };

    const updateHabitCompletion = async (habitId, date, newStatus) => {
    const habitRef = doc(db, 'habits', habitId);
    try {
        // Update the specific date's completion status in Firestore
        await updateDoc(habitRef, {
            [`datesCompleted.${date}`]: newStatus,
        });
        
        dispatch({
            type: 'UPDATE_COMPLETION',
            payload: { habitId, date, completionStatus: newStatus },
        });
    } catch (error) {
        console.error("Error updating habit completion: ", error);
    }
};

    const updateHabitStatus = async (habitId, newStatus) => {
        const habitRef = doc(db, 'habits', habitId);
        await updateDoc(habitRef, { status: newStatus }).then(() => {
            dispatch({
                type: 'UPDATE_STATUS',
                payload: { habitId, newStatus }
            });
        }).catch((error) => {
            console.error("Error updating habit status: ", error);
        });
    };

    return (
        <HabitsContext.Provider value={{ ...state, addHabit, deleteHabit, updateHabitCompletion, updateHabitStatus }}>
            {children}
        </HabitsContext.Provider>
    );
};

export const useHabits = () => useContext(HabitsContext);
