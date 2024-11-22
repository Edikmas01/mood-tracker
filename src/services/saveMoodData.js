// import { getDatabase, ref, set, push } from "firebase/database";
// import { getAuth } from "firebase/auth";

// export const saveMoodData = async (selectedEmoji, comment) => {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (!user) {
//     console.error("Ошибка: пользователь не авторизован.");
//     return;
//   }

//   if (!comment.trim()) {
//     console.error("Ошибка: комментарий не может быть пустым.");
//     return;
//   }

//   if (!selectedEmoji) {
//     console.error("Ошибка: эмоция не выбрана.");
//     return;
//   }

//   const db = getDatabase();
//   const userId = user.uid;
//   const newMoodRef = push(ref(db, `moods/${userId}/moods`));

//   const moodData = {
//     date: new Date().toISOString().split("T")[0],
//     moodLevel: selectedEmoji.moodLevel,
//     comment: comment.trim(),
//     name: selectedEmoji.name,
//     img: selectedEmoji.img,
//     id: selectedEmoji.id,
//     option: selectedEmoji.option,
//     email: user.email,
//   };

//   set(newMoodRef, moodData)
//     .then(() => {
//       console.log("Данные о настроении успешно сохранены:", moodData);
//     })
//     .catch((error) => {
//       console.error("Ошибка при сохранении данных о настроении:", error);
//     });
// }
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
    const alertMessage = "Пользователь не авторизован.";
    console.error(alertMessage);
    alert(alertMessage);
    return { success: false, message: alertMessage };
  }

  if (!comment.trim()) {
    const alertMessage = "Комментарий не может быть пустым.";
    console.error(alertMessage);
    alert(alertMessage);
    return { success: false, message: alertMessage };
  }

  if (!selectedEmoji) {
    const alertMessage = "Эмоция не выбрана.";
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
        const alertMessage = "Вы достигли дневного лимита записей.";
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
    console.log("Данные о настроении успешно сохранены:", moodData);
    return { success: true };
  } catch (error) {
    console.error("Ошибка при сохранении данных о настроении:", error);
    return { success: false, error: error.message };
  }
};
