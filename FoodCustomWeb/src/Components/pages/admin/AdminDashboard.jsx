import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/add">Add Item</Link> |{" "}
      <Link to="/admin/items">View Items</Link>
    </div>
  );
}
