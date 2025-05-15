const moods = ["Devastated","Sad","Neutral","Happy","Glorious"];
const form = document.getElementById('grievance-form');
const moodInput = document.getElementById('mood');
const moodLabel = document.getElementById('mood-label');
const severityInput = document.getElementById('severity');
const severityLabel = document.getElementById('severity-label');
const thankYou = document.getElementById('thank-you');
const newBtn = document.getElementById('new');

moodInput.addEventListener('input', () => {
  moodLabel.textContent = moods[moodInput.value];
});
severityInput.addEventListener('input', () => {
  severityLabel.textContent = severityInput.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const payload = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    mood: moods[moodInput.value],
    severity: severityInput.value,
    timestamp: new Date().toLocaleString()
  };
  fetch('FILL_WEB_APP_URL_HERE', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(() => {
    form.classList.add('hidden');
    thankYou.classList.remove('hidden');
  });
});

newBtn.addEventListener('click', () => {
  form.reset();
  moodLabel.textContent = moods[2];
  severityLabel.textContent = '5';
  thankYou.classList.add('hidden');
  form.classList.remove('hidden');
});

/*
-- Google Apps Script (in Code.gs) --
function doPost(e) {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getSheetByName('Responses');
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.timestamp, data.title, data.description, data.mood, data.severity]);
  return ContentService.createTextOutput(JSON.stringify({status: 'success'})).setMimeType(ContentService.MimeType.JSON);
}
*/
