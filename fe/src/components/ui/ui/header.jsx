import React from "react";
import StartAndFilter from "./StartAndFilter";
const Header = () => {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-primary bg-clip-text">
        To Do List
      </h1>
      <p className="text-muted-foreground">Làm việc đi nào!!!</p>
    </div>
  );
};

export default Header;
