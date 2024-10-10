import { Config } from "../config";
import UserServer from "./user.server";

class TestService {
  constructor() {}
  
  static async getVitesseStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + `/api/GetPoint/${id}`);
    const data = await response.json();
    console.log('helloVitt',data)
    return data;
  }

  static async getSautStatsByUser(id) {
    
    const response = await fetch(Config.LOCAL_URL + `/api/GetPointJump/${id}`,{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({userId: id }), 
      });
    
    const data = await response.json();
    console.log("saut data",data)
    return data;
  }

  static async getConduitStatsByUser(id) {

    const responseSlm = await fetch(Config.LOCAL_URL + `/api/GetPointslalom/${id}`);
    const dataSlm = await responseSlm.json();
    const responseZig = await fetch(Config.LOCAL_URL + `/api/GetPointzigzag/${id}`);
    const dataZig = await responseZig.json();
    console.log( dataSlm , dataZig , 'thisisisisisiisisis' )
    return  dataSlm?.totalPoints +  dataZig?.totalPoints ;
  }
  static async getAgiliteStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + '/api/getAgilite', {
      method: 'POST', // Change method to POST
      headers: {
        'Content-Type': 'application/json', // Specify content type
      },
      body: JSON.stringify({userId: id }), // Send the id in the body as JSON
    });
  
    const data = await response.json();
    console.log(data, 'no times for worry');
    return data;
  }
  

  static async getJonglageStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + `/api/getJonglage`,{
        method: 'POST', // Change method to POST
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify({userId: id }), // Send the id in the body as JSON
      });
    const data = await response.json();
    console.log(data, 'no times for worry jonglage');

    return data;
  }

  static async getTirStatsByUser(id) {
    const response = await fetch(Config.LOCAL_URL + `/api/test/tir/${id}`,{
        method: 'POST', // Change method to POST
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify({userId: id }), // Send the id in the body as JSON
      });
    const data = await response.json();
    return data.data;
  }

}

export default TestService;
