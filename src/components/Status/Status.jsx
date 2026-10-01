import "./Status.css";

export default function Status({ type = "info", children }) {
  return <p className={`status status_type_${type}`}>{children}</p>;
}
