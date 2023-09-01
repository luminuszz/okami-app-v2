import React from "react";
import { Box, Input, InputField } from "@gluestack-ui/themed";
import { useAppDispatch, useAppSelector } from "@store/index";
import { homeActions, selectSearch } from "../home.slice";

export const SearchBar: React.FC = () => {
  const search = useAppSelector(selectSearch);

  const dispatch = useAppDispatch();

  const handleChange = (value: string): void => {
    dispatch(homeActions.setSearch(value));
  };

  return (
    <Box mt={50} flex={1} justifyContent="center" alignItems="center">
      <Input>
        <InputField
          placeholder="Pesquise"
          color="white"
          value={search}
          w="$full"
          height={40}
          onChangeText={handleChange}
        />
      </Input>
    </Box>
  );
};
