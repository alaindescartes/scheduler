"use client";

import store from "@/store/store";
import { Provider } from "react-redux";

export default function StoreProvier({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
