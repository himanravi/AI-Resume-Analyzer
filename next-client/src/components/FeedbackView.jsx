// src/components/FeedbackView.jsx
export default function FeedbackView({ feedback }) {
  return (
    <div>
      <h2>Feedback</h2>
      <p>{feedback.feedback}</p>
      {/* Add more details based on your feedback object */}
    </div>
  );
}