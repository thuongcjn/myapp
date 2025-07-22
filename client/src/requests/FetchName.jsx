export const fetchName = async (userId) => {
  const userData = await fetch(`http://localhost:8080/api/users/${userId}`);
  const { data } = await userData.json();
  return data?.userName;
};
