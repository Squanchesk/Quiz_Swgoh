document.addEventListener("DOMContentLoaded", () => {
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const quiz = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const feedback = document.getElementById("feedback");
const answerButtons = document.querySelectorAll(".answer-btn");
const imageQuestionText = document.getElementById("image-question-text");
const imageOptions = document.querySelectorAll(".img-choice");
const imageFeedback = document.getElementById("image-feedback");

const progressBar = document.getElementById("progress-bar");
let currentQuestion = 0;
//const totalQuestions = 10;
let score = 0;

console.log(startBtn); // doit afficher <button id="start-btn">Commencer</button>

const questions = [
   {
    //Question n°1
    type: "text", 
    question: "A quoi servent les mods ?",
    answers: ["Augmenter les stats d'un personnage", "Collectionner des modules", "A faire jolie", "C'est quoi un mod ?"],
    correctIndex: 0
   },

   {
    //Question n°2
    type: "image-choice", 
    question: "Quelle stratégie d'évolution de mod est bonne ?",
    images: ["Quiz_Swgoh/images/Slice_4.jpg","Quiz_Swgoh/images/Slice_1.jpg","Quiz_Swgoh/images/Slice_3.jpg","Quiz_Swgoh/images/Slice_2.jpg"],
    correctIndex: 1
   },

   {
    //Question n°3
    type: "image-choice",
    question: "Quels module n'est pas à améliorer ?",
    images: ["images/Mod_def1.jpg","images/Mod_def2.jpg","images/Mod_pot1.jpg","images/Mod_tena1.jpg"],
    correctIndex: 3
   },

   {
    //Question n°4
    type: "single-image", 
    question: "Les flat stats sont meilleurs que les % ?",
    images: "images/modules.jpg",
    answers: ["Vive les pourcentages !", "Les flats sont meilleurs !", "Cela dépend des mods et persos", "La réponse D"],
    correctIndex: 2
   },

   {
    //Question n°5
    type: "single-image", 
    question: "Comment farmer les mods ?",
    images: "images/Store-Mod_Store.jpg",
    answers: ["Via les défis de modules & chargements", "Via la GA", "Via la TW", "Via les échanges entre joueurs"],
    correctIndex: 0
   },
   
   /* { question: "Quels module n'est pas à améliorer ? Quelle est la stat prioritaire sur la flèche de SLKR en GAC ?",
    answers: ["Vitesse", "Offense", "Santé", "Tenacité"],
    correctIndex: 0
   },*/
];

console.log(questions[0]);

startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    quiz.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    loadQuestion();
});

function loadQuestion() {
   const current = questions[currentQuestion];
   questionElement.innerHTML = "";
   questionElement.textContent = current.question;
   feedback.textContent = "";
   imageFeedback.textContent = "";
   updateProgressBar();

   //questionElement.innerHTML = current.question;

   // Reset affichage
   answerButtons.forEach(btn => {
      btn.style.display = "none";
   });

   document.getElementById("image-question").classList.add("hidden");
   quiz.classList.remove("hidden");

   // QUESTION TEXTE
   if (current.type === "text") {

      answerButtons.forEach((button, index) => {
         button.style.display = "block";
         button.textContent = current.answers[index];
         button.onclick = () => checkAnswer(index);
      });
   }

   // QUESTION IMAGE + TEXTE
   if (current.type === "single-image") {

      const img = document.createElement("img");
      img.src = current.images;
      img.style.width = "60%";
      img.style.marginBottom = "15px";
      questionElement.appendChild(img);

      answerButtons.forEach((button, index) => {
         button.style.display = "block";
         button.textContent = current.answers[index];
         button.onclick = () => checkAnswer(index);
      });
   }

   // QUESTION 4 IMAGES
   if (current.type === "image-choice") {

      quiz.classList.add("hidden");
      const imageQuiz = document.getElementById("image-question");
      imageQuiz.classList.remove("hidden");

      imageQuestionText.textContent = current.question;

      imageOptions.forEach((img, index) => {
         img.src = current.images[index];
         img.onclick = () => checkAnswer(index);
      });
   }
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
    nextBtn.disabled = true; // on désactive à chaque nouvelle question
});

function checkAnswer(index) {

   const current = questions[currentQuestion];

   // Choix du bon élément feedback
   let feedbackElement;

   if (current.type === "image-choice") {
       feedbackElement = imageFeedback;
   } else {
       feedbackElement = feedback;
   }

   // Reset message précédent
   feedbackElement.textContent = "";

   if (index === current.correctIndex) {
      feedbackElement.textContent = "✔ Bonne réponse !";
      score++;
   } else {
      feedbackElement.textContent = "❌ Mauvaise réponse.";
   }

   // Activer le bouton Suivant
    nextBtn.disabled = false;
    nextBtn.scrollIntoView({ behavior: "smooth", block: "end" });

    
   /*setTimeout(() => {
      currentQuestion++;

      if (currentQuestion < questions.length) {
         loadQuestion();
      } else {
         showResults();
      }

   }, 1000);*/
}

function showResults() {
   quiz.innerHTML = `
      <h2>Quiz terminé !</h2>
      <p>Score : ${score} / ${questions.length}</p>
   `;
}



function updateProgressBar() {
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progressPercent + "%";
}
});

