import { Config } from "../config";

class UserServer {
        static async fetchUsers () {
            const storedUserData = JSON.parse(localStorage.getItem("Secret"));
            const tokenn = storedUserData.token;

            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${tokenn}`,
                    },
                }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch users error');
                }
                const data = await response.json();
                return data ;
            } catch (error) {
                return {msg :  error}
            }
        };

        static async fetchUserById (id) {
            const storedUserData = JSON.parse(localStorage.getItem("Secret"));
            const tokenn = storedUserData.token;

            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user/` +  id 
                , {
                    method: "GET",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${tokenn}`,
                    },
                }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch user with id ' + id+ 'error');
                } 
                const data = await response.json();
                return data ;
            } catch (error) {
                return {msg :  error}
            }
        };

        static async fetchUserIMAGEById (id) {
            const storedUserData = JSON.parse(localStorage.getItem("Secret"));
            const tokenn = storedUserData.token;
            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user/img/` +  id
                , {
                    method: "GET",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${tokenn}`,
                    },
                }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch user with id ' + id+ 'error');
                }
                const data = await response.json();
                return data ;
            } catch (error) {
                return {msg :  error}
            }
        };

}

export default UserServer;