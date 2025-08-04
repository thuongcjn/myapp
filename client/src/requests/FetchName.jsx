export const fetchName = async (userId) => {
  const userData = await fetch(
    `https://myapp-be.onrender.com/api/users/${userId}`
  );
  const { data } = await userData.json();
  return data?.userName;
};
