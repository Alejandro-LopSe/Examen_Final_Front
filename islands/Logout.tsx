import { FunctionComponent } from "preact";

export const Logout: FunctionComponent = () => {
  const toggle = () => {
    document.cookie = "auth=; Max-Age=0.1;";
    return;
  };
  return (
    <a
      class="logout-button"
      href={"/login"}
      onClick={() => {
        toggle();
      }}
    >
      Logout
    </a>
  );
};
