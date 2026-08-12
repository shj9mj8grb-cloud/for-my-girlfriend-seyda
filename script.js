const DECORATIVE_STAR_COUNT = 100;
const SPECIAL_STAR_COUNT = 18;


/* ELEMENTS */

const intro =
  document.getElementById("intro");

const universe =
  document.getElementById("universe");

const backgroundStars =
  document.getElementById("background-stars");

const specialStars =
  document.getElementById("special-stars");

const lilyLayer =
  document.getElementById("lily-layer");

const starModal =
  document.getElementById("star-modal");

const starContent =
  document.getElementById("star-content");

const closeCard =
  document.getElementById("close-card");

const modalBackdrop =
  document.getElementById("modal-backdrop");

const animationLayer =
  document.getElementById("animation-layer");

const finalMessage =
  document.getElementById("final-message");

const lastThing =
  document.getElementById("last-thing");

const videoModal =
  document.getElementById("video-modal");

const videoBackdrop =
  document.getElementById("video-backdrop");

const closeVideo =
  document.getElementById("close-video");

const birthdayVideo =
  document.getElementById("birthday-video");

const ending =
  document.getElementById("ending");


/* STATE */

const openedStars =
  new Set();

let animationRunning = false;
let finalSequenceReady = false;
let finalSequenceStarted = false;

let audioContext = null;

let mailDingPlayed = false;

let endingShown = false;


/* CONTENT */

const stars = [

  {
    type: "photo",
    photo: "assets/photos/photo1.jpg",
    text: "Birinci fotoğraf mesajın."
  },

  {
    type: "text",
    text: "İkinci yıldız mesajın."
  },

  {
    type: "photo",
    photo: "assets/photos/photo2.jpg",
    text: "İkinci fotoğraf mesajın."
  },

  {
    type: "text",
    text: "Dördüncü yıldız mesajın."
  },

  {
    type: "photo",
    photo: "assets/photos/photo3.jpg",
    text: "Üçüncü fotoğraf mesajın."
  },

  {
    type: "text",
    text: "Altıncı yıldız mesajın."
  },

  {
    type: "text",
    text: "Yedinci yıldız mesajın."
  },

  {
    type: "photo",
    photo: "assets/photos/photo4.jpg",
    text: "Dördüncü fotoğraf mesajın."
  },

  {
    type: "text",
    text: "Dokuzuncu yıldız mesajın."
  },

  {
    type: "text",
    text: "Onuncu yıldız mesajın."
  },

  {
    type: "photo",
    photo: "assets/photos/photo5.jpg",
    text: "Beşinci fotoğraf mesajın."
  },

  {
    type: "text",
    text: "On ikinci yıldız mesajın."
  },

  {
    type: "text",
    text: "On üçüncü yıldız mesajın."
  },

  {
    type: "photo",
    photo: "assets/photos/photo6.jpg",
    text: "Altıncı fotoğraf mesajın."
  },

  {
    type: "text",
    text: "On beşinci yıldız mesajın."
  },

  {
    type: "text",
    text: "On altıncı yıldız mesajın."
  },

  {
    type: "photo",
    photo: "assets/photos/photo7.jpg",
    text: "Yedinci fotoğraf mesajın."
  },

  {
    type: "text",
    text: "The eighteenth star."
  }

];


const decorativeSymbols = [
  "✦",
  "✧",
  "⋆",
  "·",
  "✶"
];


const specialSymbols = [
  "★",
  "✦",
  "✧"
];


/* HELPERS */

function randomBetween(min, max) {

  return (
    Math.random()
    * (max - min)
    + min
  );

}


function randomItem(array) {

  return array[
    Math.floor(
      Math.random()
      * array.length
    )
  ];

}


function wait(ms) {

  return new Promise(
    resolve =>
      setTimeout(resolve, ms)
  );

}


/* AUDIO */

function unlockAudio() {

  if (!audioContext) {

    const AudioClass =
      window.AudioContext
      ||
      window.webkitAudioContext;


    if (!AudioClass) {
      return;
    }


    audioContext =
      new AudioClass();

  }


  if (
    audioContext.state ===
    "suspended"
  ) {

    audioContext
      .resume()
      .catch(() => {});

  }

}


document.addEventListener(
  "pointerdown",
  unlockAudio
);


function playNotificationSound() {

  if (
    !audioContext
    ||
    audioContext.state !==
      "running"
  ) {

    return false;

  }


  try {

    const now =
      audioContext.currentTime;


    const gain =
      audioContext.createGain();


    gain.gain.setValueAtTime(
      0.0001,
      now
    );


    gain.gain
      .exponentialRampToValueAtTime(
        0.22,
        now + 0.02
      );


    gain.gain
      .exponentialRampToValueAtTime(
        0.0001,
        now + 0.9
      );


    gain.connect(
      audioContext.destination
    );


    const note1 =
      audioContext.createOscillator();


    note1.type =
      "sine";


    note1.frequency.value =
      880;


    note1.connect(gain);

    note1.start(now);

    note1.stop(
      now + 0.3
    );


    const note2 =
      audioContext.createOscillator();


    note2.type =
      "sine";


    note2.frequency.value =
      1318.5;


    note2.connect(gain);

    note2.start(
      now + 0.15
    );

    note2.stop(
      now + 0.75
    );


    return true;

  }

  catch {

    return false;

  }

}


/* INTRO */

setTimeout(
  () => {

    intro.classList.add(
      "hide"
    );

  },
  5000
);


/* DECORATIVE STARS */

function createDecorativeStars() {

  for (
    let i = 0;
    i < DECORATIVE_STAR_COUNT;
    i++
  ) {

    const star =
      document.createElement(
        "span"
      );


    star.classList.add(
      "background-star"
    );


    star.textContent =
      randomItem(
        decorativeSymbols
      );


    star.style.left =
      `${randomBetween(
        1,
        98
      )}%`;


    star.style.top =
      `${randomBetween(
        1,
        98
      )}%`;


    star.style.fontSize =
      `${randomBetween(
        4,
        14
      )}px`;


    star.style.setProperty(
      "--speed",
      `${randomBetween(
        2.5,
        6
      )}s`
    );


    star.style.setProperty(
      "--min-opacity",
      randomBetween(
        0.12,
        0.35
      )
    );


    star.style.setProperty(
      "--max-opacity",
      randomBetween(
        0.45,
        0.85
      )
    );


    backgroundStars
      .appendChild(star);

  }

}


/* STAR POSITIONS */

function createStarPositions() {

  const positions = [];

  const minDistance = 13;

  let attempts = 0;


  while (
    positions.length
      < SPECIAL_STAR_COUNT
    &&
    attempts < 5000
  ) {

    attempts++;


    const candidate = {

      x:
        randomBetween(
          7,
          87
        ),

      y:
        randomBetween(
          7,
          86
        )

    };


    const tooClose =
      positions.some(
        position => {

          const dx =
            candidate.x
            - position.x;


          const dy =
            candidate.y
            - position.y;


          const distance =
            Math.sqrt(
              dx * dx
              +
              dy * dy
            );


          return (
            distance
            < minDistance
          );

        }
      );


    if (!tooClose) {

      positions.push(
        candidate
      );

    }

  }


  return positions;

}


/* SPECIAL STARS */

function createSpecialStars() {

  const positions =
    createStarPositions();


  stars.forEach(
    (data, index) => {

      const star =
        document.createElement(
          "button"
        );


      star.classList.add(
        "special-star"
      );


      star.dataset.index =
        index;


      star.textContent =
        randomItem(
          specialSymbols
        );


      const position =
        positions[index]
        ??
        {
          x:
            randomBetween(
              8,
              88
            ),

          y:
            randomBetween(
              8,
              86
            )
        };


      star.style.left =
        `${position.x}%`;


      star.style.top =
        `${position.y}%`;


      star.style.fontSize =
        `${randomBetween(
          28,
          34
        )}px`;


      star.style.setProperty(
        "--speed",
        `${randomBetween(
          2,
          4
        )}s`
      );


      star.addEventListener(
        "click",
        () => {

          openStar(
            index,
            star
          );

        }
      );


      specialStars
        .appendChild(star);

    }
  );

}


/* STAR FLY */

async function animateStarToCenter(
  starElement
) {

  const rect =
    starElement
      .getBoundingClientRect();


  const flyingStar =
    document.createElement(
      "div"
    );


  flyingStar.className =
    "flying-star";


  flyingStar.textContent =
    starElement.textContent;


  flyingStar.style.left =
    `${rect.left}px`;


  flyingStar.style.top =
    `${rect.top}px`;


  flyingStar.style.fontSize =
    getComputedStyle(
      starElement
    ).fontSize;


  animationLayer
    .appendChild(
      flyingStar
    );


  await wait(30);


  flyingStar.classList.add(
    "centered"
  );


  await wait(680);


  flyingStar.classList.add(
    "fade-out"
  );


  await wait(180);


  flyingStar.remove();

}


/* OPEN STAR */

async function openStar(
  index,
  starElement
) {

  if (
    animationRunning
    ||
    finalSequenceStarted
  ) {

    return;

  }


  unlockAudio();


  animationRunning =
    true;


  openedStars.add(
    index
  );


  starElement
    .classList
    .add(
      "opened"
    );


  await animateStarToCenter(
    starElement
  );


  const data =
    stars[index];


  if (
    data.type ===
    "photo"
  ) {

    starContent.innerHTML = `
      <div class="photo-memory">

        <img
          src="${data.photo}"
          alt="Our memory"
        />

        <p>
          ${data.text}
        </p>

      </div>
    `;

  }

  else {

    starContent.innerHTML = `
      <div class="text-memory">

        <p>
          ${data.text}
        </p>

      </div>
    `;

  }


  starModal.classList.remove(
    "hidden"
  );


  animationRunning =
    false;


  if (
    openedStars.size ===
    SPECIAL_STAR_COUNT
  ) {

    finalSequenceReady =
      true;

  }

}


/* CLOSE MEMORY */

async function closeModal() {

  starModal.classList.add(
    "hidden"
  );


  if (
    finalSequenceReady
    &&
    !finalSequenceStarted
  ) {

    await wait(500);


    startFinalSequence();

  }

}


closeCard.addEventListener(
  "click",
  closeModal
);


modalBackdrop.addEventListener(
  "click",
  closeModal
);


/* LILY */

function createLilyHTML() {

  return `
    <div class="lily-flower">

      <div class="lily-glow"></div>

      <div class="petal petal-1"></div>
      <div class="petal petal-2"></div>
      <div class="petal petal-3"></div>
      <div class="petal petal-4"></div>
      <div class="petal petal-5"></div>
      <div class="petal petal-6"></div>

      <div class="lily-core"></div>

    </div>
  `;

}


function bloomLilyOverStar(
  starElement
) {

  const rect =
    starElement
      .getBoundingClientRect();


  const universeRect =
    universe
      .getBoundingClientRect();


  const centerX =
    rect.left
    - universeRect.left
    + rect.width / 2;


  const centerY =
    rect.top
    - universeRect.top
    + rect.height / 2;


  const lily =
    document.createElement(
      "div"
    );


  lily.classList.add(
    "bloom-lily"
  );


  lily.style.left =
    `${centerX}px`;


  lily.style.top =
    `${centerY}px`;


  lily.innerHTML =
    createLilyHTML();


  lilyLayer.appendChild(
    lily
  );

}


/* FINAL SEQUENCE */

async function startFinalSequence() {

  finalSequenceStarted =
    true;


  universe.classList.add(
    "final-mode"
  );


  const starElements =
    [
      ...document.querySelectorAll(
        ".special-star"
      )
    ];


  for (
    const star
    of starElements
  ) {

    star.disabled =
      true;


    bloomLilyOverStar(
      star
    );


    await wait(260);

  }


  await wait(1500);


  finalMessage.classList.remove(
    "hidden"
  );


  requestAnimationFrame(
    () => {

      finalMessage
        .classList
        .add(
          "appear"
        );

    }
  );


  await wait(450);


  mailDingPlayed =
    playNotificationSound();

}


/* MAIL CLICK */

finalMessage.addEventListener(
  "click",
  async () => {

    unlockAudio();


    if (!mailDingPlayed) {

      playNotificationSound();

    }


    finalMessage.classList.add(
      "hidden"
    );


    lastThing.classList.remove(
      "hidden"
    );


    await wait(2200);


    lastThing.classList.add(
      "fade-out"
    );


    await wait(900);


    lastThing.classList.add(
      "hidden"
    );


    lastThing.classList.remove(
      "fade-out"
    );


    videoModal.classList.remove(
      "hidden"
    );


    birthdayVideo.currentTime =
      0;


    birthdayVideo.load();


    try {

      await birthdayVideo.play();

    }

    catch (error) {

      console.log(
        "Video autoplay blocked:",
        error
      );

    }

  }
);


/* ENDING */

async function showEnding() {

  if (endingShown) {
    return;
  }


  endingShown =
    true;


  birthdayVideo.pause();


  videoModal.classList.add(
    "hidden"
  );


  universe.classList.remove(
    "final-mode"
  );


  await wait(500);


  ending.classList.remove(
    "hidden"
  );

}


/* VIDEO FINISHED */

birthdayVideo.addEventListener(
  "ended",
  async () => {

    await wait(650);


    showEnding();

  }
);


/* VIDEO CLOSE */

closeVideo.addEventListener(
  "click",
  () => {

    showEnding();

  }
);


videoBackdrop.addEventListener(
  "click",
  () => {

    showEnding();

  }
);


/* VIDEO ERROR */

birthdayVideo.addEventListener(
  "error",
  () => {

    console.log(
      "Video could not be loaded."
    );

    console.log(
      birthdayVideo.error
    );

  }
);


/* TEST MODE */

const params =
  new URLSearchParams(
    window.location.search
  );


const testMode =
  params.get("test")
  ===
  "1";


function activateTestMode() {

  if (!testMode) {
    return;
  }


  const elements =
    [
      ...document.querySelectorAll(
        ".special-star"
      )
    ];


  for (
    let i = 0;
    i < 17;
    i++
  ) {

    openedStars.add(i);


    elements[i]
      ?.classList
      .add(
        "opened"
      );

  }

}


/* START */

createDecorativeStars();

createSpecialStars();

activateTestMode();