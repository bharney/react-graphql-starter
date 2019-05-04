
export default class Auth {
    constructor(history) {
        this.history = history;
    }

    isAuthenticated = () => {
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"))
        return new Date().getTime() < expiresAt
    }

    logout = () => {
        localStorage.removeItem("apiKey")
        localStorage.removeItem("expires_at")
        this.auth0.logout({
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
            returnTo: "http://localhost:3000"
        })
    }
}