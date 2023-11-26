const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get } = require("firebase/database");
const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const firebaseConfig = {
  apiKey: "AIzaSyBuyOi5a5jU6Vo3ePzV4_mOHYv1QTk7i_I",
  authDomain: "g-mooc4d.firebaseapp.com",
  projectId: "g-mooc4d",
  databaseURL:
    "https://g-mooc4d-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "g-mooc4d.appspot.com",
  messagingSenderId: "402510284693",
  appId: "1:402510284693:web:3c25ade37d0703eea8d89c",
  measurementId: "G-G5Q8GD2YLB",
};

initializeApp(firebaseConfig);

let cachedTokens = null; // To store the tokens globally

// Function to fetch tokens from /getToken endpoint
async function fetchTokens() {
  try {
    const firebaseRef = ref(getDatabase(), "tokens");
    const snapshot = await get(firebaseRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      cachedTokens = [
        ...new Set(Object.values(data).map((item) => item.token)),
      ];
    } else {
      cachedTokens = [];
    }
  } catch (error) {
    console.error("Error getting data:", error);
    cachedTokens = [];
  }
}

router.get("/getToken", async (req, res) => {
  try {
    await fetchTokens();
    res.json(cachedTokens);
  } catch (error) {
    console.error("Error getting data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/sendToAll", async (req, res) => {
  // Fetch tokens before sending notifications
  await fetchTokens();

  if (!cachedTokens || cachedTokens.length === 0) {
    res.status(400).json({ status: "error", message: "Tokens not available!" });
    return;
  }

  var notification = {
    title: "Kelas Baru Tersedia !",
    body: "Anda Dapat Mengaksesnya Sekarang Juga",
    icon: "subtitile",
  };

  var fcm_token = cachedTokens;

  var notification_body = {
    notification: notification,
    registration_ids: fcm_token,
  };

  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization:
        "key=" +
        "AAAAXbd7h5U:APA91bH00OphYKAe610fiXa63DyTSaQDf4l65-CtiB3HmCCqcP1Oz1Lvib5C2g4DwnbbT31h5hRSr1eqomA_ir-AtAP9mWlzCp8aZ65NwPtr9WrhcVTUbka_9qY674P9Bd8uNGYGAPED",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification_body),
  })
    .then(() => {
      res.status(200).json({ status: "success", message: "send success" });
    })
    .catch((err) => {
      res.status(400).json({ status: "error", message: "send error!" });
      console.log(err);
    });
});

module.exports = router;
