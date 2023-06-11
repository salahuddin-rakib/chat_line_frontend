export const authenticate = () => {
  const auth_token = window.localStorage.getItem('auth_token');
  const user_name = window.localStorage.getItem('username');
  return auth_token && !!user_name;
}
