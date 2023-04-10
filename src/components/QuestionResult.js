import React from 'react';

const QuestionResult = ({ result }) => {
  return (
    <div>
      <h2>Teacher's Response:</h2>
      {result ? (
        <p>{result.trim()}</p>
      ) : (
        <p>Please ask a question to get a response.</p>
      )}
    </div>
  );
};

export default QuestionResult;
