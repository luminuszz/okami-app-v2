import { LogLevel, OneSignal } from "react-native-onesignal";

import { ONE_SIGNAL_APP_ID } from "@env";

export const notificationService = async (): Promise<void> => {
  OneSignal.initialize(ONE_SIGNAL_APP_ID);

  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  await OneSignal.Notifications.requestPermission(true);

  OneSignal.Notifications.addEventListener("click", (event) => {
    console.log("OneSignal: notification clicked:", event);
  });
};
