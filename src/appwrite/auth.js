import appConfig from "../config/appConfig.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(appConfig.appwriteUrl).setProject(appConfig.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create((ID.unique, email, password, name));
            if (userAccount) {
                // Call another method for login etc. 
                return this.login({ email, password })
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {

            return await this.account.createEmailPasswordSession({ email, password });

        } catch (error) {
            throw error
        }
    }

    async getCurrentUser({ }) {
        try {
            return await this.account.get() ? await this.account.get() : null;
        } catch (error) {
            throw error
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error
        }
    }

}

const authService = new AuthService();

export default authService










