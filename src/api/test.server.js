import { Config } from "../config";
import UserServer from "./user.server";

class TestService {
  constructor() {}
  
  static async getVitesseStatsByUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let { id, username } = user ? user : { id: "", username: "" };

    const response = await fetch(Config.LOCAL_URL + "/api/GetPoint/55");
    const data = await response.json();
    console.log(data)
    return data;
  }

  static async getSautStatsByUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let { id, username } = user ? user : { id: "", username: "" };

    const response = await fetch(Config.LOCAL_URL + "/api/GetPointJump/55");
    const data = await response.json();
    console.log(data)
    return data;
  }

  static async getConduitStatsByUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let { id, username } = user ? user : { id: "", username: "" };

    const responseSlm = await fetch(Config.LOCAL_URL + "/api/GetPointslalom/55");
    const dataSlm = await responseSlm.json();
    const responseZig = await fetch(Config.LOCAL_URL + "/api/GetPointslalom/55");
    const dataZig = await responseZig.json();
    console.log(dataSlm.totalPoints + dataZig.totalPoints , 'thisisisisisiisisis' )
    return dataSlm.totalPoints + dataZig.totalPoints;
  }
  static async getagiliteStatsByUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let { id, username } = user ? user : { id: "", username: "" };

    const response = await fetch(Config.LOCAL_URL + "/api/test/agilite/55");
    const data = await response.json();
    console.log(data , 'no times for worry')
    return data.data;
  }

  static async getagiliteStatsByUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let { id, username } = user ? user : { id: "", username: "" };

    const response = await fetch(Config.LOCAL_URL + "/api/test/agilite/55");
    const data = await response.json();
    return data.data;
  }
  static async getJonglageStatsByUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let { id, username } = user ? user : { id: "", username: "" };

    const response = await fetch(Config.LOCAL_URL + "/api/test/jonglage/55");
    const data = await response.json();
    return data;
  }

  static async getTirStatsByUser() {
    let user = JSON.parse(localStorage.getItem("user"));
    let { id, username } = user ? user : { id: "", username: "" };

    const response = await fetch(Config.LOCAL_URL + "/api/test/tir/55");
    const data = await response.json();
    return data.data;
  }

}

export default TestService;
