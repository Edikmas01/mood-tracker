import { ref, get, child } from "firebase/database";
import { database } from "../firebase"; // проверьте правильность пути

export async function fetchUserMoodData(userId) {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `moods/${userId}/moods`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching mood data:", error);
    return null;
  }
}

