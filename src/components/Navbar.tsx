import React from "react";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonIcon,
  HStack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useGetCurrentUserQuery } from "@services/okami";
import { useNavigation } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";

export const Navbar: React.FC = () => {
  const { navigate } = useNavigation<any>();

  const { data } = useGetCurrentUserQuery(null);

  const avatarName = data?.name?.slice(0, 2)?.toUpperCase() ?? "";

  return (
    <Box px="$2" py="$2">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack alignItems="center" space="md">
          <Avatar borderRadius="$full">
            <AvatarFallbackText>{avatarName}</AvatarFallbackText>
            <AvatarImage source={{ uri: data?.avatarImageUrl ?? "" }} />
            <AvatarBadge />
          </Avatar>

          <VStack>
            <Text color="$gray200" fontWeight="bold">
              Bom dia
            </Text>
            <Text fontSize="$md" color="$gray100" fontWeight="bold">
              Davi Ribeiro
            </Text>
          </VStack>
        </HStack>

        <Button
          bgColor="transparent"
          onPress={() => {
            navigate("MarkWorkFinishedPage");
          }}
        >
          <ButtonIcon
            as={() => <MaterialIcons name="menu" size={25} color="white" />}
          />
        </Button>
      </Box>
    </Box>
  );
};
