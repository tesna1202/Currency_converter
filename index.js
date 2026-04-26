const currencyFirstEl = document.getElementById("currency-first");
const worthFirstEl = document.getElementById("worth-first");
const currencySecondEl = document.getElementById("currency-second");
const worthSecondEl = document.getElementById("worth-second");
const exchangeRateEl = document.getElementById("exchange-rate");
const swapBtn = document.getElementById("swap");

updateRate()

function updateRate() {
  fetch(`https://open.er-api.com/v6/latest/${currencyFirstEl.value}`)
    .then(res => res.json())
    .then(data => {
      if (!data || !data.rates) {
        console.log("API error:", data);
        return;
      }

      const rate = data.rates[currencySecondEl.value];

      exchangeRateEl.innerText =
        `1 ${currencyFirstEl.value} = ${rate} ${currencySecondEl.value}`;

      worthSecondEl.value =
        (worthFirstEl.value * rate).toFixed(2);
    })
    .catch(error => {
      console.log("Fetch error:", error);
    });
}

currencyFirstEl.addEventListener("change", updateRate);

currencySecondEl.addEventListener("change", updateRate);

worthFirstEl.addEventListener("input", updateRate);

swapBtn.addEventListener("click", () => {
  const temp = currencyFirstEl.value;
  currencyFirstEl.value = currencySecondEl.value;
  currencySecondEl.value = temp;

  updateRate();
});