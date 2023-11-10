document.addEventListener("DOMContentLoaded", async function () {
  const cardContainer = document.querySelector(".card-container");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  async function fetchDetailInfo(id) {
    if (id) {
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        const cardDetails = await response.json();
        return cardDetails.data;
      } catch (error) {
        console.error("Fetch error:", error);
        detailContainer.innerHTML = "<p>Detay bulunamadı.</p>";
      }
    }
  }
  function displayCards(data) {
    const cardElement = createCardElement(data);
    cardContainer.appendChild(cardElement);
  }
  function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.style.setProperty("--card-width", "1125px");
    cardElement.style.setProperty("--card-height", "400px");
    cardElement.classList.add("card");

    const imageElement = document.createElement("img");
    imageElement.classList.add("card__image");
    imageElement.src = card.avatar;

    const nameElement = document.createElement("div");
    nameElement.classList.add("card__name");
    nameElement.textContent = `${card.first_name} ${card.last_name}`;

    const emailElement = document.createElement("div");
    emailElement.classList.add("card__email");
    emailElement.textContent = card.email;

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("card__button");
    buttonElement.textContent = "Back";
    
    buttonElement.addEventListener("click", function () {
      window.location.href = "index.html";
    });
    cardElement.appendChild(imageElement);
    cardElement.appendChild(nameElement);
    cardElement.appendChild(emailElement);
    cardElement.appendChild(buttonElement);
    return cardElement;
  }
  const cardDetail = await fetchDetailInfo(id);
  displayCards(cardDetail);
});
