

export const handleExploreCollection = (navigate) => {
  // 🔥 ALWAYS set redirect first
  localStorage.setItem("redirectAfterLogin", "/products");

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");   // ya /signup (jo tum use kar rahe ho)
  } else {
    navigate("/products");
  }
};
