import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { defaultTheme } from "./themes/theme.config";
import Routes from "@routes/index";
import { Provider } from "react-redux";
import Store from "@store/index";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={Store}>
        <GluestackUIProvider config={defaultTheme}>
          <View style={styles.container}>
            <StatusBar style="dark" />
            <Routes />
          </View>
        </GluestackUIProvider>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
