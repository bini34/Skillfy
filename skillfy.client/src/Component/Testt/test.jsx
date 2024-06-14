import React, { useState } from 'react';
import './test.css'; // Add your styles here

const Sidebar = () => {
  const [menus, setMenus] = useState([
    { id: 1, isOpen: false },
    { id: 2, isOpen: false },
    // Add more menus as needed
  ]);

  const toggleMenu = (id) => {
    setMenus(menus.map(menu => 
      menu.id === id ? { ...menu, isOpen: !menu.isOpen } : menu
    ));
  };

  return (
    <div className="sidebartest">
      {menus.map(menu => (
        <div key={menu.id} className="menu-container">
          <button onClick={() => toggleMenu(menu.id)} className="menu-button">
            {menu.isOpen ? 'Close Menu' : 'Open Menu'}
          </button>
          {menu.isOpen && (
            <div className="menu">
              <button className="menu-item">Button 1</button>
              <button className="menu-item">Button 2</button>
              <button className="menu-item">Button 3</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
