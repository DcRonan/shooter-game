const key = 'DaHJ4cc1qLowKo5QQm9a';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;

const getScores = () => {
  const response = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.result.length === 0) {
        throw new Error()
      }
      return data.result.sort((a, b) => b.score - a.score)
    })
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
