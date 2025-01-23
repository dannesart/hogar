export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  console.log("Check auth");
  if (!user.value) {
    return navigateTo("/log-in");
  }
});
