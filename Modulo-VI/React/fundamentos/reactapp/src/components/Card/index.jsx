import "./styles.css";

export const Card = ({ name, time }) => (
  <div className="card">
    <strong>{name}</strong>
    <small>{time}</small>
  </div>
);
