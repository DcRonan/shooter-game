const key = 'DaHJ4cc1qLowKo5QQm9a';

const getScores = async () => {
  url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;
  const response = fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
  return response;
};

const postScore = async (user, score) => {
  const data = await getScores()

  
};
