export default class Auth {
    constructor(history) {
        this.history = history;
    }

    isAuthenticated = () => {
        return localStorage.getItem("react-graphql-starter")
    }

    logout = () => {
        localStorage.removeItem("react-graphql-starter")
    }

}