export default function Logout() {
  localStorage.removeItem("snipsnap-token");
  return 0;
}
