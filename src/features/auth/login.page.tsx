import { type AuthRoute } from "@routes/auth.routes";
import React from "react";
import {
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Image,
  Input,
  InputField,
  VStack,
} from "@gluestack-ui/themed";
import Container from "@components/Container";
import { useLoginMutation } from "@services/okami";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppToast } from "@components/Toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@store/index";
import { setToken } from "./auth.slice";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .transform((value) => value.trim()),
  password: z.string().min(6).max(100),
});

type FormSchema = z.infer<typeof formSchema>;

const loginImage =
  "https://raw.githubusercontent.com/luminuszz/okami/master/images/okami-logo.png";

interface Props extends AuthRoute<"LoginPage"> {}

const LoginPage: React.FC<Props> = () => {
  const { show } = useAppToast();
  const [makeLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log({ errors });

  const handleLogin = (data: FormSchema): void => {
    makeLogin(data)
      .unwrap()
      .then(async ({ token }) => {
        if (token) {
          void AsyncStorage.setItem("@okami:token", token).then(() => {
            dispatch(setToken(token));
          });
        }

        show("Login feito com sucesso", "success");
      })
      .catch(() => {
        show("Houve um erro ao tentar fazer login", "error");
      });
  };

  return (
    <Container>
      <Center w="$full" h="$full">
        <VStack px="$5" space="lg" width="$full">
          <Center>
            <Image
              borderRadius={"$full" as any}
              backgroundColor="$gray200"
              source={{
                uri: loginImage,
              }}
              alt="Okami iamge"
              size="xl"
            />
          </Center>

          <Center mt="$4">
            <Heading color="$gray200">Okami</Heading>
          </Center>

          <FormControl size="sm" isDisabled={false}>
            <FormControlLabel mb="$1">
              <FormControlLabelText color="$gray100">
                E-mail
              </FormControlLabelText>
            </FormControlLabel>
            <Input>
              <Controller
                render={({ field }) => (
                  <InputField
                    fontSize="$xs"
                    color="$gray200"
                    type="text"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    {...field}
                    onChangeText={field.onChange}
                  />
                )}
                name="email"
                control={control}
              />
            </Input>
          </FormControl>

          <FormControl size="sm">
            <FormControlLabel mb="$1">
              <FormControlLabelText color="$gray100">
                Senha
              </FormControlLabelText>
            </FormControlLabel>

            <Controller
              render={({ field }) => (
                <Input>
                  <InputField
                    fontSize="$xs"
                    placeholder="Senha"
                    type="password"
                    secureTextEntry
                    color="$gray200"
                    {...field}
                    onChangeText={field.onChange}
                  />
                </Input>
              )}
              name="password"
              control={control}
            />
          </FormControl>

          <Button
            onPress={handleSubmit(handleLogin)}
            isDisabled={isLoading}
            bgColor="$darkBlue600"
          >
            {isLoading ? (
              <ButtonSpinner mr="$1" />
            ) : (
              <ButtonText fontWeight="$medium" fontSize="$sm">
                Login
              </ButtonText>
            )}
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default LoginPage;
