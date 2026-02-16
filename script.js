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
    const singleFeedback = document.getElementById("single-feedback");
    const playerInput = document.getElementById("player-input");
    const startContainer = document.getElementById("start-container");
    const progressBar = document.getElementById("progress-bar");

    let currentQuestion = 0;
    let score = 0;
    let playerName = "";
    let answerStatusArray = []; // Ce tableau va contenir "Correct" ou "Incorrect" pour chaque question
    let hasAnswered = false;



    const questions = [{
        // ... tes questions ici ...
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
    images: ["images/Slice_4.jpg","images/Slice_1.jpg","images/Slice_3.jpg","images/Slice_2.jpg"],
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

   {
    //Question n°6
    type: "single-image", 
    question: "Faut-il faire des refresh d'énergie module ?",
    images: "images/WikiMods.jpg",
    answers: ["Oui", "Non", "3*50", "Quelques-uns quand on peut"],
    correctIndex: 3
   },

   {
    //Question n°7
    type: "single-image", 
    question: "Quels set de mods farmer en priorité ?",
    images: "images/Potency_Mods.jpg",
    answers: ["Protection / Pouvoir / Défense", "Attaque / Coups Critiques / Santé", "Dégâts Critiques / Tenacité / Vitesse", "Attaque / Santé / Vitesse"],
    correctIndex: 3
   },

   {
   //Question n°8
    type: "single-image", 
    question: "Que faire quand le quota max de mods est atteint ?",
    images: "images/Potency_Mods.jpg",
    answers: ["Farmer d'autres mods", "Trier les mods et farmer les matériaux de slice", "Tout vendre", "Trier les mods"],
    correctIndex: 1
    },

    {
    //Question n°9
    type: "single-image", 
    question: "Comment savoir si son Toon est bien moddé ?",
    images: "images/mod_toon.jpg",
    answers: ["En comparant avec B2B Faune", "En posant la question sur Facebook", "Sur swgoh.gg et en demandant aux joueurs", "La réponse D"],
    correctIndex: 2
    },

    {
    //Question n°10
    type: "single-image", 
    question: "Quelle est la commande pour omegabot ?",
    images: "images/omegabot.jpg",
    answers: ["/modscore allycode: yourallycode", "/omega allycode: yourallycode", "omegabot allycode: yourallycode", "modscore allycode: yourallycode"],
    correctIndex: 0
    },

   /* { question: "Quels module n'est pas à améliorer ? Quelle est la stat prioritaire sur la flèche de SLKR en GAC ?",
    answers: ["Vitesse", "Offense", "Santé", "Tenacité"],
    correctIndex: 0
   },*/
    ];

    // Démarrer le quiz
    

startBtn.addEventListener("click", () => {
    // Récupère le pseudo ou met "Joueur" par défaut
    playerName = playerInput.value.trim() || "Joueur";

    // Cache le container de départ
    startContainer.classList.add("hidden");

    // Affiche le quiz et le bouton suivant
    quiz.classList.remove("hidden");
    nextBtn.classList.remove("hidden");

    // Charge la première question
    loadQuestion();
});


    function loadQuestion() {
    window.scrollTo(0, 0);

    const current = questions[currentQuestion];

    hasAnswered = false;
    nextBtn.disabled = true;

    // Reset feedback
    feedback.textContent = "";
    imageFeedback.textContent = "";
    singleFeedback.textContent = "";

    updateProgressBar();

    // Masquer tous les blocs
    quiz.classList.remove("hidden");
    document.getElementById("image-question").classList.add("hidden");
    document.getElementById("image-single").classList.add("hidden");

    // Masquer tous les boutons texte
    answerButtons.forEach(btn => {
        btn.style.display = "none";
        btn.disabled = false;
    });

    // Réactiver images
    imageOptions.forEach(img => {
        img.style.pointerEvents = "auto";
    });

    let currentAnswerElements = [];

    /* =========================
       QUESTION TEXTE
    ========================= */
    if (current.type === "text") {

        questionElement.textContent = current.question;

        answerButtons.forEach((button, index) => {
            button.style.display = "block";
            button.textContent = current.answers[index];
            button.onclick = () => checkAnswer(index, answerButtons);
        });

        currentAnswerElements = answerButtons;
    }

    /* =========================
       QUESTION IMAGE UNIQUE
    ========================= */
    if (current.type === "single-image") {

        quiz.classList.add("hidden");

        const block = document.getElementById("image-single");
        block.classList.remove("hidden");

        document.getElementById("single-question").textContent = current.question;
        document.getElementById("image-single-text").src = current.images;

        const buttons = block.querySelectorAll(".single-answer");

        buttons.forEach((button, index) => {
            button.disabled = false;
            button.style.display = "block";
            button.textContent = current.answers[index];
            button.onclick = () => checkAnswer(index, buttons);
        });

        currentAnswerElements = buttons;
    }

    /* =========================
       QUESTION IMAGE MULTIPLE
    ========================= */
    if (current.type === "image-choice") {

        quiz.classList.add("hidden");

        const imageQuiz = document.getElementById("image-question");
        imageQuiz.classList.remove("hidden");

        imageQuestionText.textContent = current.question;

        imageOptions.forEach((img, index) => {
            img.src = current.images[index];
            img.style.pointerEvents = "auto";
            img.onclick = () => checkAnswer(index, imageOptions);
        });

        currentAnswerElements = imageOptions;
    }
}


    nextBtn.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
        nextBtn.disabled = true;
    });

    function checkAnswer(index) {

    if (hasAnswered) return;
    hasAnswered = true;

    const current = questions[currentQuestion];

    let feedbackElement = current.type === "image-choice"
        ? imageFeedback
        : current.type === "single-image"
        ? singleFeedback
        : feedback;

    feedbackElement.textContent = "";

    if (index === current.correctIndex) {
        feedbackElement.textContent = "✔ Bonne réponse !";
        score++;
        answerStatusArray[currentQuestion] = "Correct";
    } else {
        feedbackElement.textContent = "❌ Mauvaise réponse.";
        answerStatusArray[currentQuestion] = "Incorrect";
    }

    /* =========================
       Désactiver UNIQUEMENT la question active
    ========================= */

    if (current.type === "text") {
        answerButtons.forEach(btn => btn.disabled = true);
    }

    if (current.type === "single-image") {
        document.querySelectorAll("#image-single .single-answer")
            .forEach(btn => btn.disabled = true);
    }

    if (current.type === "image-choice") {
        imageOptions.forEach(img => img.style.pointerEvents = "none");
    }

    nextBtn.disabled = false;
    nextBtn.scrollIntoView({ behavior: "smooth", block: "end" });
}


    function sendResultsToForm() {

        const formData = new FormData();

        formData.append("entry.5824654", playerName);
        formData.append("entry.78492408", score);

        formData.append("entry.157484799", answerStatusArray[0]);
        formData.append("entry.1055751246", answerStatusArray[1]);
        formData.append("entry.305102737", answerStatusArray[2]);
        formData.append("entry.357724666", answerStatusArray[3]);
        formData.append("entry.1475643521", answerStatusArray[4]);
        formData.append("entry.908713765", answerStatusArray[5]);
        formData.append("entry.1233956739", answerStatusArray[6]);
        formData.append("entry.1432476913", answerStatusArray[7]);
        formData.append("entry.719696218", answerStatusArray[8]);
        formData.append("entry.112668682", answerStatusArray[9]);

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSfb6zI6i6V-X5KMclYvtc3MwSTa329RSwunwQZlU-IzAJYTaw/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
    });

    console.log("Résultats envoyés !");
    
    }


    function showResults() {
        nextBtn.classList.add("hidden");
        document.getElementById("image-single").classList.add("hidden");
        document.getElementById("image-question").classList.add("hidden");
        quiz.classList.remove("hidden");   
        quiz.innerHTML = `
            <h2>Quiz terminé !</h2>
            <p style="text-align:center;">Pseudo : <strong>${playerName}</strong></p>
            <p style="text-align:center;">Score : ${score} / ${questions.length}</p>
        `;

        sendResultsToForm(playerName, score, answerStatusArray);
    }

    function updateProgressBar() {
        const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = progressPercent + "%";
    }
});



