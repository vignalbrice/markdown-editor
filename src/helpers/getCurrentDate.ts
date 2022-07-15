export default function getCurrentDate() {
  const date = new Date();
  return date.toLocaleDateString("en-EN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
