let activeQuestions = [];

function startTest() {
    const name = nameInput();
    const roll = rollInput();
    const subject = document.getElementById("subject").value;

    if (!name || !roll || !subject) {
        alert("नाम, रोल नंबर और विषय चुनना अनिवार्य है");
        return;
    }

    activeQuestions = subject === "science" ? scienceQuestions : socialQuestions;

    document.getElementById("studentForm").style.display = "none";
    document.getElementById("quizSection").style.display = "block";

    loadQuestions();
}

function loadQuestions() {
    const form = document.getElementById("quizForm");
    form.innerHTML = "";

    activeQuestions.forEach((q, i) => {
        let html = `<p><b>${i + 1}. ${q.q}</b></p>`;
        q.options.forEach((opt, j) => {
            html += `
            <label id="q${i}o${j}">
                <input type="radio" name="q${i}" value="${j}">
                ${opt}
            </label>`;
        });
        form.innerHTML += html + "<br>";
    });
}

function submitTest() {
    let score = 0;

    activeQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        q.options.forEach((_, j) => {
            const label = document.getElementById(`q${i}o${j}`);
            label.querySelector("input").disabled = true;

            if (j === q.ans) {
                label.style.background = "#c8e6c9";
            }
            if (selected && j == selected.value && j !== q.ans) {
                label.style.background = "#ffcdd2";
            }
        });

        if (selected && parseInt(selected.value) === q.ans) score++;
    });

    alert(`आपका स्कोर: ${score} / ${activeQuestions.length}`);
}

function nameInput() {
    return document.getElementById("name").value.trim();
}
function rollInput() {
    return document.getElementById("roll").value.trim();
}
