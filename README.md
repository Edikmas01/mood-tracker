# Mood Tracker

[Demo Link](https://mood-tracker-0011.web.app/)\
[Design Prototype on Figma](https://www.figma.com/design/L3gPy4PLTSsL4UgJGhoIZw/Untitled?node-id=0-1\&t=oGLV5HJamFKzJ1K5-1)

Mood Tracker is a web application that helps you track changes in your mood. Using a visual graph and comments, you can analyze your emotional state over a specific period.

## 🔹 Main Features

✅ **Registration & Login** – Authentication via Firebase (sign up, login, password recovery).\
✅ **Mood Tracking** – Log your emotional state and leave comments.\
✅ **Mood Trends** – Analyze mood changes over time with a graph.\
✅ **Daily View** – A convenient calendar allows you to quickly find records for a specific date.

## ⚙️ Technologies & Project Structure

Mood Tracker is built using the following technologies:

- **React + Vite** – Fast and efficient development.
- **React Router** – Handles navigation within the app.
- **Redux Toolkit** – Manages user state (authentication implemented via `Slice`).
- **Firebase** – Used for authentication, real-time database storage, and hosting.
- **SCSS** – Used for styling and mobile-first responsive design.

## 🔹 Firebase Integration

Firebase is a key part of the Mood Tracker application, handling authentication, data storage, and hosting.

### 🔹 Authentication

User authentication is implemented using Firebase Authentication with email and password login. The authentication state is managed via Redux Toolkit:

```js
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    removeUser(state) {
      state.id = null;
      state.token = null;
      state.email = null;
      state.name = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});
```

### 🔹 Storing Mood Data

User mood entries are stored in Firebase Firestore, where each entry consists of:

```js
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
```

### 🔹 Fetching Mood Data

Mood history is retrieved from Firestore to display trends and graphs:

```js
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
```

## 🔹 Additional Data Handling

- **Emotion List** – Loaded from a local JSON file:
  ```json
  [
    {
      "img": "/img/vOne/Happy.png",
      "id": "1",
      "name": "Happy",
      "option": "one",
      "moodLevel": 5
    }
  ]
  ```
- **Authorization Hook** – Custom `useAuth()` hook simplifies user data handling:
  ```js
  export function useAuth() {
    const { id, token, email, name, password } = useSelector((state) => state.user);
    return {
      isAuth: !!token,
      id,
      token,
      email,
      name,
      password,
    };
  }
  ```

## 🚀 Deployment

The application is deployed on **Firebase Hosting**:\
👉 [Mood Tracker – Live Demo](https://mood-tracker-0011.web.app/)

## 📱 Responsive Design

- Optimized for mobile devices, tablets, and desktops.
- Follows the **"Mobile First"** approach for a seamless user experience on all screens.

---

If you have any questions, feel free to reach out! 😊

