const express = require("express");

const fetch = require("node-fetch");

const router = express.Router();

router.post("/sendToAll", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.status(200).send("OK");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  var notification = {
    title: "Kelas Baru Tersedia !",
    body: "Anda Dapat Mengaksesnya Sekarang Juga",
    icon: "subtitile",
  };

  var fcm_token = [
    "clCmuWutufamUEsCkeTZa_:APA91bEMaoRvYchaYEBkbWfuAytbkZEjqGVpauwSfJKjoStLLx60857hODar7r1u8WnXQi4zbwQYJzIfMjBZ46F5h7AhIxuqbI0qfGSqV7b4oDMFyHuaf9WHCbp3HrVVa-U6g7IUPi48",
  ];

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
      res.status(200).send("send success");
    })
    .catch((err) => {
      res.status(400).send("send error");
      console.log(err);
    });
});

module.exports = router;
