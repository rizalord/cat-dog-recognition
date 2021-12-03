import { ReactNode } from "react"
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import ReachLink from "next/link"

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
)

export default function DefaultNavbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box bg={useColorModeValue("blue.200", "gray.900")} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          maxW={{ base: "5xl" }}
          mx="auto"
        >
          <ReachLink href="/" passHref>
            <Heading
              color={useColorModeValue("white", "gray.100")}
              fontSize={{ base: "lg", md: "2xl" }}
              as={"a"}
            >
              Cat Dog Recognizer
            </Heading>
          </ReachLink>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7} alignItems="center">
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <a
                href="https://github.com/rizalord/cat-dog-recognition"
                target="_blank"
                rel="noreferrer"
              >
                <Avatar
                  size={"sm"}
                  bg="transparent"
                  cursor="pointer"
                  src={
                    colorMode === "light"
                      ? "/images/github-dark.png"
                      : "/images/github-light.png"
                  }
                />
              </a>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
