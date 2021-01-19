const key = 'DaHJ4cc1qLowKo5QQm9a';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;

const getScores = (url) => {
  const response = fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
  return response;
};

const postScores = (user, score, url) =>
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, score }),
  });

export { url, getScores, postScores };
