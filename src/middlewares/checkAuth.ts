export default function checkAuth(next:any, isAuthenticated:boolean) {
  if (isAuthenticated) {
    next("/");
  } else {
    next("/login");
  }
}
