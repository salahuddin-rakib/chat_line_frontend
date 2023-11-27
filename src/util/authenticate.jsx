export const authenticate = () => {
  const auth_token = window.localStorage.getItem('authToken');
  const user_name = window.localStorage.getItem('userName');
  return auth_token && !!user_name;
}
