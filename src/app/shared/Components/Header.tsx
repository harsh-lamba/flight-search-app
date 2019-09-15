import * as React from "react";

interface IHeaderProps {}

export const Header: React.FC<IHeaderProps> = props => {
  return (
    <header className="app-header">
      <h1 className="app-header__title">Flight Search Engine</h1>
    </header>
  );
};
