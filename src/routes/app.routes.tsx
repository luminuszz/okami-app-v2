import React from "react";
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomePage from "@features/home/home.page";
import UpdateChapterPage from "@features/home/updateChapter.page";

export type AppRoutesParams = {
  Home: undefined;
  UpdateChapter: {
    workId: string;
    chapter: number;
  };
  UpdateWorkPage: {
    workId: string;
  };
  MarkWorkFinishedPage: undefined;
};

export type AppRoute<Route extends keyof AppRoutesParams> =
  NativeStackScreenProps<AppRoutesParams, Route>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutesParams>();

const screenOptions = { headerShown: false };

export const AppRoutes = () => (
  <Navigator screenOptions={screenOptions} initialRouteName="Home">
    <Screen name="Home" component={HomePage} />
    <Screen name="UpdateChapter" component={UpdateChapterPage} />
  </Navigator>
);
