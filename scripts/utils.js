export const modalCardPicture = document.querySelector("#card-image-modal");
export const modalCaption = document.querySelector("#modal-card-caption");
//export const cardImageModal = document.querySelector("#card-image-modal");

export function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopUp(modalOpened);
  }
}

export function handleOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopUp(e.target);
  }
}

export function openPopUp(modal) {
  document.addEventListener("keydown", closeModalByEscape);
  document.addEventListener("mousedown", handleOverlay);
  modal.classList.add("modal_opened");
}

export function closePopUp(modal) {
  document.removeEventListener("keydown", closeModalByEscape);
  document.removeEventListener("mousedown", handleOverlay);
  modal.classList.remove("modal_opened");
}
