// chack the user is logged in or not
export const isUserLoggedIn = () => sessionStorage.getItem('token');

// get the token
export const getToken = () => sessionStorage.getItem('token');

// remove the token
export const removeToken = () => sessionStorage.removeItem('token');

// get role of user
export const getUserRole = () => sessionStorage.getItem('role');

// clear the storage at logout
export const clearStorage = () => sessionStorage.clear();