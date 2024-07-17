import { Config } from "../config";
import UserServer from "./user.server";

class TestService {
  constructor() {}
  
  static async getVitesseStatsByUser(id) {
    // let user = JSON.parse(localStorage.getItem("user"));
    // let { id, username } = user ? user : { id: "", username: "" };
    console.log(id , 'jksdfhsjkd');
    const response = await fetch(Config.LOCAL_URL + `/api/GetPoint/${id}`);
    const data = await response.json();
    console.log('hello',data)
    return data;
  }

  static async getSautStatsByUser(id) {
    
    const response = await fetch(Config.LOCAL_URL + `/api/GetPointJump/${id}`);
    const data = await response.json();
    console.log(data)
    return data;
  }

  static async getConduitStatsByUser(id) {

    const responseSlm = await fetch(Config.LOCAL_URL + `/api/GetPointslalom/${id}`);
    const dataSlm = await responseSlm.json();
    const responseZig = await fetch(Config.LOCAL_URL + `/api/GetPointzigzag/${id}`);
    const dataZig = await responseZig.json();
    console.log(dataSlm.totalPoints + dataZig.totalPoints , 'thisisisisisiisisis' )
    return dataSlm.totalPoints + dataZig.totalPoints || 100;
  }
  static async getagiliteStatsByUser(id) {
  
    const response = await fetch(Config.LOCAL_URL + `/api/test/agilite/${id}`);
    const data = await response.json();
    console.log(data , 'no times for worry')
    return data;
  }

  static async getJonglageStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + `/api/test/jonglage/${id}`);
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
