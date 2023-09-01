import React, { useEffect } from "react";

import Container from "../../components/Container";
import { Box } from "@gluestack-ui/themed";
import { useAppDispatch } from "@store/index";
import { homeActions } from "./home.slice";
import { type AppRoute } from "@routes/app.routes";
import { WorkList } from "./components/WorkList";
import { Navbar } from "@components/Navbar";

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
      <Box px="$2">
        <WorkList />
      </Box>
    </Container>
  );
};

export default HomePage;
