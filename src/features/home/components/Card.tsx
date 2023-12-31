import React from "react";
import { formatDistance, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Badge,
  BadgeText,
  Box,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import { type Work, WORK_CATEGORY } from "@services/okami/types";
import { Feather } from "@expo/vector-icons";

interface CardProps {
  data: Work;
  onClickMarRead: (id: string, chapter: number) => void;
  onClickCard: (id: string) => void;
}

const emote = {
  [WORK_CATEGORY.enum.MANGA]: "MANGA 📖",
  [WORK_CATEGORY.enum.ANIME]: "ANIME 📺",
};

const defaultCardImage =
  "https://okami-storage.s3.amazonaws.com/work-images/animes-default.jpg";

export const Card: React.FC<CardProps> = ({
  data,
  onClickMarRead,
  onClickCard,
}) => {
  const atTime = formatDistance(
    parseISO(data.nextChapterUpdatedAt ?? data.updatedAt),
    new Date(),
    {
      addSuffix: true,
      includeSeconds: true,
      locale: ptBR,
    },
  );

  const chapterMessage =
    data.category === WORK_CATEGORY.enum.ANIME
      ? `Novo Episódio ${data.nextChapter}`
      : `Novo Capítulo ${data.nextChapter}`;

  return (
    <Box borderRadius="$3xl" position="relative">
      <Pressable
        onPress={() => {
          onClickMarRead(data.id, data.chapter);
        }}
      >
        <Image
          height={200}
          w="$full"
          borderRadius={"$3xl" as any}
          resizeMode="cover"
          source={{
            uri: data?.imageUrl ?? defaultCardImage,
          }}
          alt="algo aqui"
        />
      </Pressable>
      <HStack
        mt="$3"
        justifyContent="space-between"
        alignItems="center"
        px="$2"
        space="2"
      >
        <Text
          maxWidth={190}
          isTruncated
          color="$gray100"
          fontWeight="bold"
          fontSize="$sm"
        >
          {data.name}
        </Text>

        <HStack alignItems="center" space="sm">
          <Icon as={() => <Feather name="clock" size={24} color="white" />} />
          <Text
            fontSize="$sm"
            fontWeight="medium"
            maxWidth={200}
            isTruncated
            color="$gray100"
          >
            {atTime}
          </Text>
        </HStack>
      </HStack>

      <Badge
        borderRadius="$2xl"
        px="$4"
        m="$2"
        right="$0"
        top="$0"
        position="absolute"
        backgroundColor="$gray100"
        size="md"
        justifyContent="center"
        action="success"
        variant="outline"
      >
        <BadgeText>{chapterMessage}</BadgeText>
      </Badge>

      <Badge
        borderRadius="$2xl"
        px="$4"
        m="$2"
        left="$0"
        bottom="$10"
        position="absolute"
        size="md"
        variant="outline"
        action="info"
      >
        <BadgeText>{emote[data.category]}</BadgeText>
      </Badge>
    </Box>
  );
};
