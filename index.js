// Fetch the Hebrew date from the API
const getHebrewDateFromAPI = async (date) => {
  try {
    const {
      data: { hebrew },
    } = await axios.get(`https://www.hebcal.com/converter?cfg=json&date=${date.toISOString().split("T")[0]}&g2h=1&strict=1`);
    return hebrew;
  } catch {
    throw new Error("Failed to retrieve Hebrew date.");
  }
};

// Event listener for button click
document.getElementById("convertBtn").addEventListener("click", async () => {
  const dateInput = document.getElementById("gregorianDate").value;
  if (!dateInput) return (document.getElementById("hebrewDate").textContent = "Please select a valid date.");

  try {
    const hebrewDate = await getHebrewDateFromAPI(new Date(dateInput));
    document.getElementById("hebrewDate").textContent = `Hebrew date: ${hebrewDate}`;
  } catch (error) {
    document.getElementById("hebrewDate").textContent = `Error: ${error.message}`;
  }
});
