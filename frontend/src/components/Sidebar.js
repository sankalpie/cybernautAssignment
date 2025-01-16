import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar">
    <h3>Hobby Categories</h3>
    <ul>
      <li draggable>Music</li>
      <li draggable>Sports</li>
      <li draggable>Travel</li>
      <li draggable>Cooking</li>
    </ul>
  </aside>
);

export default Sidebar;
