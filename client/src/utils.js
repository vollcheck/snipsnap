export const timeConverter = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

export const capitalize = (s) => {
  return s
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};

export const getToken = () => {
  return localStorage.getItem("snipsnap-token");
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) {
    return false;
  }
  // const me = await getMe(token);
  // if (!me) {
  //   return false;
  // }
  return true;
};

export const getUserAvatar = (user) => {
  console.log(user);
  if (!user["user/avatar"] || user["user/avatar"] === 0) {
    return "hide-the-pain-harold.jpg";
  } else {
    return user["user/avatar"];
  }
};
