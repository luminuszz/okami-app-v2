import React, { useEffect } from "react";

import Container from "../../components/Container";
import { VStack } from "@gluestack-ui/themed";
import { useAppDispatch } from "@store/index";
import { homeActions } from "./home.slice";
import { type AppRoute } from "@routes/app.routes";
import { WorkList } from "./components/WorkList";
import { Navbar } from "@components/Navbar";
import { SearchBar } from "@features/home/components/SearchBar";

interface Props extends AppRoute<"Home"> {}

const HomePage: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    homeActions.setSearch("");

    return () => {
      dispatch(homeActions.setSearch(""));
    };
  }, []);

  return (
    <Container>
      <Navbar />

      <VStack space="xl" mt="$10">
        <SearchBar />
        <WorkList />
      </VStack>
    </Container>
  );
};

export default HomePage;
