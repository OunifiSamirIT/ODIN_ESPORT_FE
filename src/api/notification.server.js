import { Config } from "../config";
import UserServer from "./user.server";
import secureLocalStorage from "react-secure-storage";

class NotificationService {
  constructor() {}

  static async instantSend(socket, data) {
    let user = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
    let { id, username } = user ? user : { id: "", username: "" };

    console.log("instantSave id", id);
    let userData = await UserServer.fetchUserById(id);
    let fullUserName = userData?.user?.nom + " " + userData?.user?.prenom;
    let userImage = userData?.user?.image;

    console.log(
      "🚀 ~ NotificationService ~ instantSend ~ userData:",
      userData,
      typeof userData,
      "userData?.user",
      userData?.user
    );
    console.log("🚀 ~ NotificationService ~ instantSend ~ image:", userImage);
    console.log("instantSavee", data);

    let content = data.content ? data.content : "";
    let notificationData = {
      fromUser_id: id,
      fromUser_image: userImage,
      isReaded: 0,
      content: "",
      ...data,
      fromUser_name: fullUserName,
      pattern:
        id +
        "_" +
        data.forWichAction +
        "_" +
        data.toUser_id +
        "_" +
        data.postId +
        "_" +
        content,
    };
    console.log(
      "🚀 ~ NotificationService ~ instantSend ~ notificationData:",
      notificationData
    );

    if (socket && notificationData) {
      socket.emit("send-notification", JSON.stringify(notificationData));
    }
  }

  static async getNotificationForCurrentUser() {
    let user = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
    let { id, username } = user ? user : { id: "", username: "" };

    const response = await fetch(Config.LOCAL_URL + "/api/notification/");
    const notification = await response.json();
    console.log(
      "🚀 ~ NotificationService ~ getNotificationForCurrentUser ~ res:",
      notification.data
    );
    let data = notification.data;
    let noticationForCurrentUserOnly = [];

    data.map((raw) => {
      console.log("raw", raw);
      console.log(
        "raw.toUser_id == id",
        raw.toUser_id,
        id,
        raw.toUser_id == id
      );
      if (
        (raw.toUser_id == id || raw.toUser_id == -1) &&
        raw.toUser_id != raw.fromUser_id
      ) {
        console.log(raw, id, "rawid");
        noticationForCurrentUserOnly.push(raw);
      }
    });
    console.log(
      "🚀 ~ NotificationService ~ getNotificationForCurrentUser ~ noticationForCurrentUserOnly:",
      noticationForCurrentUserOnly
    );
    return noticationForCurrentUserOnly;
  }

  static listeningToNotification(socketInstance, setnotificationData) {
    socketInstance.on("get-notification", (data) => {
      setnotificationData(JSON.parse(data));

      console.log(`notification data from header: ${data}`);
    });
  }

  static async deleteNotificationById(id) {
    let response = await fetch(Config.LOCAL_URL + "/api/notification/" + id, {
      method: "DELETE",
    });

    return response;
  }

  static async deleteAll() {
    let user = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
    let { id, username } = user ? user : { id: "", username: "" };

    let response = await fetch(
      Config.LOCAL_URL + "/api/notificationForUser/" + id,
      {
        method: "DELETE",
      }
    );

    return response;
  }

  static async setNotificationReaded(id) {
    let response = await fetch(Config.LOCAL_URL + "/api/notification/" + id, {
      method: "PUT",
    });

    return response;
  }
  // static realSave () {

  // }

  // static realSave () {

  // }
}

export default NotificationService;
