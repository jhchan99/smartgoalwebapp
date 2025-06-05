import { 
  collection, 
  doc, 
  getDocs, 
//   setDoc, 
  deleteDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  addDoc 
} from 'firebase/firestore';
import { db } from '../auth/firebase';

// Collection references
const GOALS_COLLECTION = 'goals';
const REMINDERS_COLLECTION = 'reminders';

export class GoalsService {
  // **GOALS CRUD OPERATIONS**
  
  static async getUserGoals(userId) {
    try {
      const goalsRef = collection(db, GOALS_COLLECTION);
      const q = query(
        goalsRef, 
        where("userId", "==", userId),
        orderBy("dateSaved", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const goals = [];
      
      querySnapshot.forEach((doc) => {
        goals.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return goals;
    } catch (error) {
      console.error('Error fetching user goals:', error);
      throw error;
    }
  }

  static async saveGoal(userId, goalData) {
    try {
      const goalWithMetadata = {
        ...goalData,
        userId,
        dateSaved: serverTimestamp(),
        isViewed: false,
        dateViewed: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, GOALS_COLLECTION), goalWithMetadata);
      
      return {
        id: docRef.id,
        ...goalData,
        dateSaved: new Date().toISOString(), // For immediate UI update
        isViewed: false,
        dateViewed: null
      };
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  }

  static async updateGoal(goalId, updatedData) {
    try {
      const goalRef = doc(db, GOALS_COLLECTION, goalId);
      await updateDoc(goalRef, {
        ...updatedData,
        updatedAt: serverTimestamp()
      });
      
      return { id: goalId, ...updatedData };
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }

  static async deleteGoal(goalId) {
    try {
      await deleteDoc(doc(db, GOALS_COLLECTION, goalId));
      
      // Also delete associated reminders
      await this.deleteGoalReminders(goalId);
      
      return true;
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }

  static async markGoalsAsViewed(userId, goalIds) {
    try {
      const updatePromises = goalIds.map(goalId => {
        const goalRef = doc(db, GOALS_COLLECTION, goalId);
        return updateDoc(goalRef, {
          isViewed: true,
          dateViewed: serverTimestamp()
        });
      });

      await Promise.all(updatePromises);
      return true;
    } catch (error) {
      console.error('Error marking goals as viewed:', error);
      throw error;
    }
  }

  // **REMINDERS CRUD OPERATIONS**
  
  static async saveReminders(userId, goalId, reminderData) {
    try {
      const reminderDoc = {
        userId,
        goalId,
        ...reminderData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true
      };

      const docRef = await addDoc(collection(db, REMINDERS_COLLECTION), reminderDoc);
      
      return {
        id: docRef.id,
        ...reminderDoc
      };
    } catch (error) {
      console.error('Error saving reminders:', error);
      throw error;
    }
  }

  static async getUserReminders(userId) {
    try {
      const remindersRef = collection(db, REMINDERS_COLLECTION);
      const q = query(
        remindersRef,
        where("userId", "==", userId),
        where("isActive", "==", true),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const reminders = [];
      
      querySnapshot.forEach((doc) => {
        reminders.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return reminders;
    } catch (error) {
      console.error('Error fetching user reminders:', error);
      throw error;
    }
  }

  static async deleteGoalReminders(goalId) {
    try {
      const remindersRef = collection(db, REMINDERS_COLLECTION);
      const q = query(remindersRef, where("goalId", "==", goalId));
      
      const querySnapshot = await getDocs(q);
      const deletePromises = [];
      
      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });

      await Promise.all(deletePromises);
      return true;
    } catch (error) {
      console.error('Error deleting goal reminders:', error);
      throw error;
    }
  }

  // **LOCAL STORAGE MIGRATION**
  
  static async migrateLocalStorageToFirestore(userId) {
    try {
      const STORAGE_KEY = 'smartgoal-app-goals';
      const localGoals = localStorage.getItem(STORAGE_KEY);
      
      if (!localGoals) return [];

      const goals = JSON.parse(localGoals);
      const migrationPromises = goals.map(goal => this.saveGoal(userId, goal));
      
      const migratedGoals = await Promise.all(migrationPromises);
      
      // Clear local storage after successful migration
      localStorage.removeItem(STORAGE_KEY);
      
      return migratedGoals;
    } catch (error) {
      console.error('Error migrating local storage to Firestore:', error);
      throw error;
    }
  }
}
