import { registerRootComponent } from "expo";
import { notificationService } from "@services/notifications";

import App from "./src/App";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

void notificationService().then(() => {
  console.log("Notification service started");
});

registerRootComponent(App);
