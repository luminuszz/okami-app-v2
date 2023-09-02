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
import { getCalendars } from "expo-localization";
import { MaterialIcons } from "@expo/vector-icons";
import { getHours } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const currentTimezone = getCalendars()?.[0]?.timeZone ?? "";

export const Navbar: React.FC = () => {
  const { navigate } = useNavigation<any>();

  const currentHour = getHours(utcToZonedTime(new Date(), currentTimezone));

  const { data: user } = useGetCurrentUserQuery(null);

  const avatarName = user?.name?.slice(0, 2)?.toUpperCase() ?? "";

  const subTitle =
    currentHour >= 12
      ? "Boa tarde"
      : currentHour >= 18
      ? "Boa noite"
      : "Bom dia";

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
            <AvatarImage source={{ uri: user?.avatarImageUrl ?? "" }} />
            <AvatarBadge />
          </Avatar>

          <VStack>
            <Text color="$gray200" fontWeight="bold">
              {subTitle}
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
