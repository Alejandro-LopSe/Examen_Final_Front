import { FunctionComponent } from "preact";
import { Logout } from "../islands/Logout.tsx";

export const Header: FunctionComponent<{ name: string }> = ({ name }) => {
  return (
    <header class="header-container">
      <div class="header-content">
        <span class="user-name">{name}</span>
        <Logout />
      </div>
    </header>
  );
};
