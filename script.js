const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesModal = document.getElementById("yesModal");

// Show cute confirmation when "Yes" is clicked
yesBtn.addEventListener("click", () => {
  yesModal.classList.remove("hidden");
  setTimeout(() => {
    yesModal.classList.add("hidden");
  }, 2200);
});

// Make the "No" button run away from the cursor
const moveNoButton = (event) => {
  const card = document.querySelector(".invite-card");
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const cursorX = event.clientX;
  const cursorY = event.clientY;

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const distanceX = cursorX - btnCenterX;
  const distanceY = cursorY - btnCenterY;

  const distance = Math.hypot(distanceX, distanceY);
  const safeRadius = 120;

  if (distance < safeRadius) {
    const escapeFactor = (safeRadius - distance) / safeRadius;
    const moveX = -(distanceX / distance) * escapeFactor * 80;
    const moveY = -(distanceY / distance) * escapeFactor * 60;

    const maxOffsetX = cardRect.width / 2 - btnRect.width;
    const maxOffsetY = cardRect.height / 2 - btnRect.height;

    let currentX = parseFloat(noBtn.dataset.offsetX || "0");
    let currentY = parseFloat(noBtn.dataset.offsetY || "0");

    currentX = Math.max(-maxOffsetX, Math.min(maxOffsetX, currentX + moveX));
    currentY = Math.max(-maxOffsetY, Math.min(maxOffsetY, currentY + moveY));

    noBtn.dataset.offsetX = currentX;
    noBtn.dataset.offsetY = currentY;
    noBtn.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }
};

document.addEventListener("mousemove", moveNoButton);

