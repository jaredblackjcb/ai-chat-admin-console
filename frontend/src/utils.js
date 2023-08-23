// import { useSelector } from "react-redux";

// export const isLoggedIn = useSelector((state) => state.user);
export function translateToUserFriendlyDate(datetime) {
  const date = new Date(datetime);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
