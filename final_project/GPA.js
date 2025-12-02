// Focus first input when page loads
window.addEventListener('DOMContentLoaded', () => {
  const first = document.getElementById('ch1');
  if (first) first.focus();
});

// Letter -> grade points
const gradePoints = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };

function calculateGPA() {
  const chIds = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5'];
  const grIds = ['gr1', 'gr2', 'gr3', 'gr4', 'gr5'];

  let totalPoints = 0;
  let totalCredits = 0;
  let entries = 0;

  for (let i = 0; i < 5; i++) {
    const chEl = document.getElementById(chIds[i]);
    const grEl = document.getElementById(grIds[i]);
    if (!chEl || !grEl) continue;

    const ch = chEl.value.trim();
    const gr = grEl.value.trim().toUpperCase();

    if (ch !== '' && gr !== '') {
      const credits = parseFloat(ch);
      const gp = gradePoints[gr];

      if (isNaN(credits) || credits <= 0) {
        alert(`Course ${i + 1}: Credit Hours must be a positive number.`);
        return;
      }
      if (gp === undefined) {
        alert(`Course ${i + 1}: Grade must be A, B, C, D, or F.`);
        return;
      }

      totalCredits += credits;
      totalPoints += gp * credits;
      entries++;
    }
  }

  if (entries < 2) {
    alert('Please enter at least 2 Grade/Credit pairs.');
    return;
  }

  const gpa = totalPoints / totalCredits; // Σ(grade points × credits) / Σ(credits)
  const out = document.getElementById('avgGpa');
  if (out) out.value = gpa.toFixed(2); // max 2 decimals
}

function resetGPA() {
  ['ch1','ch2','ch3','ch4','ch5','gr1','gr2','gr3','gr4','gr5','avgGpa']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

  const first = document.getElementById('ch1');
  if (first) first.focus();
}