export const isAuthenticatedRol = () => ((sessionStorage.getItem('token') || sessionStorage.getItem('role')==="ROLE_ADMIN")?true:false);