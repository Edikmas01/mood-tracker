import {
  getDatabase,
  ref,
  set,
  push,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { getAuth } from "firebase/auth";

export const saveMoodData = async (selectedEmoji, comment) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    const alertMessage = "User is not authorized.";
    console.error(alertMessage);
    alert(alertMessage);
    return { success: false, message: alertMessage };
  }

  if (!comment.trim()) {
    const alertMessage = "Comment cannot be empty.";
    console.error(alertMessage);
    alert(alertMessage);
    return { success: false, message: alertMessage };
  }

  if (!selectedEmoji) {
    const alertMessage = "Emotion not selected.";
    console.error(alertMessage);
    alert(alertMessage);
    return { success: false, message: alertMessage };
  }

  const db = getDatabase();
  const userId = user.uid;
  const today = new Date().toISOString().split("T")[0];
  const moodsRef = ref(db, `moods/${userId}/moods`);

  try {
    const todayQuery = query(moodsRef, orderByChild("date"), equalTo(today));
    const snapshot = await get(todayQuery);

    if (snapshot.exists()) {
      const moodCount = Object.keys(snapshot.val()).length;
      const dailyLimit = 2;

      if (moodCount >= dailyLimit) {
        const alertMessage = "You have reached your daily post limit..";
        console.error(alertMessage);
        alert(alertMessage);
        return { success: false, message: alertMessage };
      }
    }

    const newMoodRef = push(moodsRef);
    const moodData = {
      date: today,
      moodLevel: selectedEmoji.moodLevel,
      comment: comment.trim(),
      name: selectedEmoji.name,
      img: selectedEmoji.img,
      id: selectedEmoji.id,
      option: selectedEmoji.option,
      email: user.email,
    };

    await set(newMoodRef, moodData);
    console.log("Mood data saved successfully:", moodData);
    return { success: true };
  } catch (error) {
    console.error("Error saving mood data:", error);
    return { success: false, error: error.message };
  }
};
