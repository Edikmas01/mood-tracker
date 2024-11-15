
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

export const saveMoodData = async (selectedEmoji, comment) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("Ошибка: пользователь не авторизован.");
    return;
  }

  if (!comment.trim()) {
    console.error("Ошибка: комментарий не может быть пустым.");
    return;
  }

  if (!selectedEmoji) {
    console.error("Ошибка: эмоция не выбрана.");
    return;
  }

  const db = getDatabase();
  const userId = user.uid;
  const newMoodRef = push(ref(db, `moods/${userId}/moods`));

  const moodData = {
    date: new Date().toISOString().split("T")[0],
    moodLevel: selectedEmoji.moodLevel,
    comment: comment.trim(),
    name: selectedEmoji.name,
    img: selectedEmoji.img,
    id: selectedEmoji.id,
    option: selectedEmoji.option,
    email: user.email,
  };

  set(newMoodRef, moodData)
    .then(() => {
      console.log("Данные о настроении успешно сохранены:", moodData);
    })
    .catch((error) => {
      console.error("Ошибка при сохранении данных о настроении:", error);
    });
}
