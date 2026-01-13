function startTest() {
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();

    if (name === "" || roll === "") {
        alert("नाम और रोल नंबर भरना अनिवार्य है");
        return;
    }

    document.getElementById("studentForm").style.display = "none";
    document.getElementById("quizSection").style.display = "block";

    loadQuestions();
}

function loadQuestions() {
    const form = document.getElementById("quizForm");
    form.innerHTML = "";

    questions.forEach((q, i) => {
        let html = `<p><b>${i + 1}. ${q.q}</b></p>`;
        q.options.forEach((opt, j) => {
            html += `
                <label>
                    <input type="radio" name="q${i}" value="${j}">
                    ${opt}
                </label><br>
            `;
        });
        form.innerHTML += html + "<br>";
    });
}

function submitTest() {
    let score = 0;

    questions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.ans) {
            score++;
        }
    });

    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;

    alert(`छात्र: ${name}\nरोल: ${roll}\nस्कोर: ${score} / 30`);

    downloadCSV(name, roll, score);
}

function downloadCSV(name, roll, score) {
    const csv = `Name,Roll,Score\n${name},${roll},${score}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "result.csv";
    a.click();
}
