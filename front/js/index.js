import {
  addCard,
  getCardProperties,
  clearCreateInputs,
  clearFindInputs,
  renderAllCards,
  openModalMessage,
  getFindProperties,
} from "./dom_utils.js";
import { createInsect, deleteInsect, updateInsect, getInsects, countWeight } from "./api.js";

const createButton = document.getElementById("submit");
const findButton = document.getElementById("find");
const cancelButton = document.getElementById("cancel");
const countButton = document.getElementById("count");
const popup = document.getElementById("popup");
const popupClose = document.getElementById("popup_close");

export const render = async () => {
  const { name, sort } = getFindProperties();
  const cards = await getInsects(name, sort);
  renderAllCards(cards);
};

createButton.addEventListener("click", async () => {
  const newCard = getCardProperties();
  clearCreateInputs();
  if (!newCard) return;
  try {
    const { message } = await createInsect(newCard);
    if (message) {
      openModalMessage(message);
    }
  } catch (error) {
    await render();
  }
});

findButton.addEventListener("click", async () => {
  await render();
});

cancelButton.addEventListener("click", async () => {
  clearFindInputs();
  await render();
});

countButton.addEventListener("click", async () => {
  const { name, sort } = getFindProperties();
  const {totalWeight} = await countWeight(name, sort);
  openModalMessage(`Total mass is ${totalWeight}`);
});

popupClose.addEventListener("click", () => {
  popup.classList.remove("open");
});

render();
