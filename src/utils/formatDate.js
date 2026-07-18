export function formatDate(date) {

  if (!date) {
    return "";
  }


  const formatted = new Date(date);


  const value = formatted.toLocaleDateString(
    "fr-FR",
    {
      month: "long",
      year: "numeric",
    }
  );


  return value.charAt(0).toUpperCase() + value.slice(1);

}