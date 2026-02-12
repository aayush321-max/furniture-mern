export const requireAuth = (navigate) => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return false;
  }
  return true;
};
