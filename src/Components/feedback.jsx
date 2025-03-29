import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../css/feedback.css';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState(
    JSON.parse(localStorage.getItem('feedbacks')) || []
  );
  const [message, setMessage] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    if (!feedback) {
      setMessage('Please provide your feedback!');
      return;
    }

    // Add the new feedback to the feedback list
    const newFeedbacks = [...feedbacks, feedback];
    setFeedbacks(newFeedbacks);

    // Save the updated feedback list to local storage
    localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));

    setMessage('Feedback submitted successfully!');
    setFeedback('');
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Submit Your Feedback</h2>
      
      {message && <div className="feedback-message">{message}</div>}
      
      <Form onSubmit={handleSubmitFeedback}>
        <Form.Group controlId="feedback">
          <Form.Label>Your Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Type your feedback here"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Feedback
        </Button>
      </Form>

      <h3 className="feedback-list-title">All Submitted Feedback</h3>
      <div className="feedback-list">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <p>{feedback}</p>
            </div>
          ))
        ) : (
          <p>No feedback submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
