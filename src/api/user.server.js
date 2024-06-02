import { Config } from "../config";

class UserServer {
        static async fetchUsers () {
            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user`);

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
            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user/` +  id);

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
            try {
                const response = await fetch(`${Config.LOCAL_URL}/api/user/img/` +  id);

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