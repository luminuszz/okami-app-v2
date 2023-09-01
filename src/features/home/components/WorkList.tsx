import { Box } from "@gluestack-ui/themed";
import { Card } from "./Card";
import React, { useMemo } from "react";
import { useAppSelector } from "@store/index";
import { selectSearch } from "../home.slice";
import { useNavigation } from "@react-navigation/native";
import { type AppRoutesParams } from "@routes/app.routes";
import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFetchAllWorksUnreadQuery } from "@services/okami";
import { compareDesc } from "date-fns";
import { FlatList } from "react-native";

export const WorkList: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppRoutesParams>>();

  const { data: works } = useFetchAllWorksUnreadQuery(null);

  const search = useAppSelector(selectSearch);

  const filteredWorks = useMemo(
    () =>
      works
        ?.filter((work) =>
          work.name.toLowerCase().includes(search.toLowerCase()),
        )
        .sort((a, b) => compareDesc(a.updatedAt, b.updatedAt)),
    [works, search],
  );

  return (
    <FlatList
      style={{ marginBottom: 50, marginTop: 8 }}
      contentContainerStyle={{ paddingBottom: 80 }}
      showsVerticalScrollIndicator={false}
      data={filteredWorks}
      renderItem={({ item }) => (
        <Card
          onClickCard={() => {
            navigation.push("UpdateWorkPage", { workId: item.id });
          }}
          onClickMarRead={() => {
            navigation.push("UpdateChapter", {
              chapter: item.chapter,
              workId: item.id,
            });
          }}
          data={item}
        />
      )}
      ItemSeparatorComponent={() => <Box my="$2" />}
      keyExtractor={(item) => item.id}
    />
  );
};
