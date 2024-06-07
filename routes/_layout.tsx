import { PageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { ApiUser } from "../types.ts";

export default function Layout(props: PageProps<unknown, ApiUser>) {
  return (
    <>
      {props.route !== "/login" && props.route !== "/register"
        ? (
          <div class="page-container">
            <Header name={props.state.name}></Header>
            <props.Component></props.Component>
          </div>
        )
        : <props.Component></props.Component>}
    </>
  );
}
