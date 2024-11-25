export const verifyChain = (events) => {
  for (let i = 1; i < events.length; i++) {
    const current = events[i];
    const previous = events[i - 1];

    if (current.previousHash !== previous.hash) {
      return false; // Chain is broken
    }
  }
  return true; // Chain is consistent
};
