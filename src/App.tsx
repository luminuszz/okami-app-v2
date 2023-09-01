import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { defaultTheme } from "./themes/theme.config";
import Routes from "@routes/index";
import { Provider } from "react-redux";
import Store from "@store/index";

export default function App() {
  return (
    <Provider store={Store}>
      <StatusBar style="dark" />
      <GluestackUIProvider config={defaultTheme}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </GluestackUIProvider>
    </Provider>
  );
}
