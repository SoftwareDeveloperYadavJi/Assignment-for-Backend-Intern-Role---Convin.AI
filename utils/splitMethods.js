// Equal split method
const equalSplit = (totalAmount, participants) => {
  const numberOfParticipants = participants.length;

  if (numberOfParticipants === 0) {
    throw new Error('There must be at least one participant.');
  }

  const splitAmount = totalAmount / numberOfParticipants;

  // Return an array of participant objects with userId and amount
  return participants.map(participantId => ({
    userId: participantId, // Ensure this is the participant's ID
    amount: splitAmount
  }));
};


// Exact split method
const exactSplit = (totalAmount, participants) => {
  let totalSplit = 0;
  const splitData = participants.map(participant => {
    if (typeof participant.amount !== 'number' || participant.amount < 0) {
      throw new Error('Each participant must have a valid numerical amount.');
    }
    totalSplit += participant.amount;
    return {
      userId: participant.userId,
      amount: participant.amount
    };
  });

  if (totalSplit !== totalAmount) {
    throw new Error('Total amount split does not match the total expense amount.');
  }

  return splitData;
};

// Percentage split method
const percentageSplit = (totalAmount, participants) => {
  const totalPercentage = participants.reduce((sum, participant) => sum + participant.percentage, 0);

  if (totalPercentage !== 100) {
    throw new Error('Total percentage must equal 100%');
  }

  return participants.map(participant => {
    const amount = (participant.percentage / 100) * totalAmount;
    return {
      userId: participant.userId, // Ensure userId is already formatted if needed
      amount: amount,
    };
  });
};


module.exports = { equalSplit, exactSplit, percentageSplit };
