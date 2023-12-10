import React from 'react';

const Appbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Calorie tracker</span>
      </div>
    </nav>
  );
};

export default Appbar;