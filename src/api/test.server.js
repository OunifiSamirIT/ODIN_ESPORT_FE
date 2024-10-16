import { Config } from "../config";
import UserServer from "./user.server";

class TestService {
  constructor() {}

  static async getVitesseStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + `/api/getvitesse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    console.log("helloVitt", data);
    return data;
  }

  static async getSautStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + `/api/getSaut`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id }),
    });

    const data = await response.json();
    console.log("saut data", data);
    return data;
  }

  static async getConduitStatsByUser(id) {
    const responseSlm = await fetch(Config.LOCAL_URL + `/api/getConduit`, {
      method: "POST", // Change method to POST
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify({ userId: id }), // Send the id in the body as JSON
    });
    const dataSlm = await responseSlm.json();
    console.log("salom data here", dataSlm);
    // const responseZig = await fetch(Config.LOCAL_URL + `/api/GetPointzigzag/${id}`, {
    //     method: 'POST', // Change method to POST
    //     headers: {
    //       'Content-Type': 'application/json', // Specify content type
    //     },
    //     body: JSON.stringify({userId: id }), // Send the id in the body as JSON
    //   });
    // const dataZig = await responseZig.json();
    // console.log( dataSlm , dataZig , 'thisisisisisiisisis' )
    return dataSlm;
  }
  static async getAgiliteStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + "/api/getAgilite", {
      method: "POST", // Change method to POST
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify({ userId: id }), // Send the id in the body as JSON
    });

    const data = await response.json();
    console.log(data, "no times for worry vitesse");
    return data;
  }

  static async getJonglageStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + `/api/getJonglage`, {
      method: "POST", // Change method to POST
      headers: {
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify({ userId: id }), // Send the id in the body as JSON
    });
    const data = await response.json();
    console.log(data, "no times for worry jonglage");

    return data;
  }

  static async getTirStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + `/api/getTir`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API Response: ", data); // Log the raw response
    return data; // Return the entire data object
  }
}

export default TestService;
