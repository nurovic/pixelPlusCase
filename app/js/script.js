document.addEventListener("DOMContentLoaded", async function () {
  const cardContainer = document.querySelector(".card-container");
  const createNewMember = document.getElementById("createNewMember");
  const paginationContainer = document.getElementById("paginationContainer");

  let currentPage = 1;
  async function fetchCards(page) {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const cards = await response.json();
      currentPage = cards.page;
      return cards;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  function displayCards(page) {
    cardContainer.innerHTML = "";
    page.forEach((card) => {
      const cardElement = createCardElement(card);
      cardContainer.appendChild(cardElement);

      const buttonElement = cardElement.querySelector(".card__button");
      buttonElement.addEventListener("click", function () {
        window.location.href = `detail.html?id=${card.id}`;
      });
      buttonElement.classList.add("animated");
      buttonElement.addEventListener("animationend", function () {
        buttonElement.classList.remove("animated");
      });
    });
  }

  function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.style.setProperty("--card-width", "350px");
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
    buttonElement.textContent = "Review";

    cardElement.appendChild(imageElement);
    cardElement.appendChild(nameElement);
    cardElement.appendChild(emailElement);
    cardElement.appendChild(buttonElement);
    return cardElement;
  }

  function displayPagination() {
    paginationContainer.innerHTML = "";

    // Sol Ok
    const prevPageButton = document.createElement("button");
    prevPageButton.textContent = "❮";
    prevPageButton.classList.add("pagination-arrow");
    prevPageButton.id = "prevPage";
    prevPageButton.addEventListener("click", async function () {
      if (currentPage > 1) {
        const newCards = await fetchCards(currentPage - 1);
        displayCards(newCards.data);
        updatePaginationButtons();
      }
    });
    paginationContainer.appendChild(prevPageButton);

    for (let i = 1; i <= 2; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("pagination-number");
      pageButton.addEventListener("click", async function () {
        const newCards = await fetchCards(i);
        displayCards(newCards.data);
        updatePaginationButtons();
      });
      paginationContainer.appendChild(pageButton);
    }

    const nextPageButton = document.createElement("button");
    nextPageButton.textContent = "❯";
    nextPageButton.classList.add("pagination-arrow");
    nextPageButton.id = "nextPage";
    nextPageButton.addEventListener("click", async function () {
      if (currentPage < initialCards.total_pages) {
        const newCards = await fetchCards(currentPage + 1);
        displayCards(newCards.data);
        updatePaginationButtons();
      }
    });
    paginationContainer.appendChild(nextPageButton);

    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    const numberButtons =
      paginationContainer.querySelectorAll(".pagination-number");

    numberButtons.forEach((button, index) => {
      if (index + 1 === currentPage) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }
  createNewMember.addEventListener("click", function () {
    window.location.href = "/member.html";
});
  const initialCards = await fetchCards(currentPage);
  displayCards(initialCards.data);
  displayPagination(initialCards.total_pages);
});
