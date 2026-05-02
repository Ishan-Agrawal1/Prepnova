export const shuffleArray = (items) => {
  return [...items].sort(() => Math.random() - 0.5);
};

export const getRandomItems = (items, count) => {
  const shuffled = shuffleArray(items);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
