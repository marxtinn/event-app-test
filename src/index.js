import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { globalStore } from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fonts: {
          heading: "Roboto",
          body: "Roboto",
        },
      },
    },
  },
});

root.render(
  <BrowserRouter>
    <Provider store={globalStore}>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
