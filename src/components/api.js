const key = 'DaHJ4cc1qLowKo5QQm9a';
const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/DaHJ4cc1qLowKo5QQm9a/scores`;

const networkError = (result) => {
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  return result;
};

const getScores = () => {
  const response = fetch(url)
    .then(networkError)
    .then((response) => response.json())
    .then((data) => {
      if (data.result.length === 0) {
        throw new Error();
      }
      return data.result.sort((a, b) => b.score - a.score);
    })
  return response;
};

const postScores = (user, score, url) => fetch(url, {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ user, score }),
}).then(networkError);

export { url, getScores, postScores };
