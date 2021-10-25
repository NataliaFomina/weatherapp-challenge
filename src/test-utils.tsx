import { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/configureStore";

function render(ui: ReactElement, options?: any) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
export { render, store };
