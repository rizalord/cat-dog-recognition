import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { Button, Input, Spinner } from "@chakra-ui/react"
import { NextPage } from "next"
import { Image } from "@chakra-ui/image"
import React, { useRef, useState } from "react"
import DefaultLayout from "../components/layouts/DefaultLayout"
import axios from "axios"

enum ButtonState {
  Loading,
  Active,
  Disabled,
}

const Predict: NextPage = () => {
  const [image, setImage] = useState<string | null>(null)
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [score, setScore] = useState<number | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isPredicting, setIsPredicting] = useState<boolean>(false)
  const [buttonState, setButtonState] = useState<ButtonState>(
    ButtonState.Disabled
  )
  const [isError, setIsError] = useState<string | null>(null)

  const uploadRef = useRef<HTMLInputElement>(null)

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    // get the file path
    const file = e.dataTransfer.files[0]
    // set the image
    setImage(URL.createObjectURL(file))
    setImageBlob(file)
    setButtonState(ButtonState.Active)
  }

  const onPredict = async () => {
    setButtonState(ButtonState.Loading)
    setScore(0)
    setMessage("")
    setIsPredicting(true)
    setIsError(null)

    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"
    const apiUrl = `${baseUrl}/predict/`

    const formData = new FormData()
    formData.append("file", imageBlob!)
    const { status, animalName, percentage, message } = (await axios.post(
      apiUrl,
      formData
    )).data as {
      status: number
      animalName: string
      percentage: number
      message: string
    }

    if (animalName === "Other") {
      setIsError("No animal detected")
    }

    if (status) {
      setScore(percentage)
      setMessage(message)
    }
    setIsPredicting(false)
    setButtonState(ButtonState.Active)
  }

  const onUploadClick = () => {
    uploadRef.current!.click()
  }

  const onChangeUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    setImage(URL.createObjectURL(file))
    setImageBlob(file)
    setButtonState(ButtonState.Active)
  }

  return (
    <DefaultLayout>
      <Flex
        maxW={"5xl"}
        flexDirection={{ base: "column", md: "row" }}
        py={{ base: 10, md: 24 }}
        px={{ base: 4, md: 0 }}
        mx="auto"
        justifyContent="center"
        alignItems="center"
      >
        {/* Left */}
        <Flex
          width={{ base: "100%", md: "50%" }}
          flexDir="column"
          mb={{ base: 24, md: 0 }}
        >
          <Input
            placeholder="Upload your image"
            type="file"
            hidden
            ref={uploadRef}
            onChange={onChangeUploadImage}
          />
          <Box
            borderWidth="1px"
            borderColor="gray.600"
            width="full"
            height="300px"
            bgColor="transparent"
            borderRadius="md"
            borderStyle="dashed"
            mb={{ base: 5, md: 8 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            p={2}
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault()
            }}
          >
            {image ? (
              <Image src={image} width="100%" height="100%" borderRadius="sm" />
            ) : (
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDir="column"
              >
                <Text>Drag and drop your image here.</Text>
                <Flex flexDirection="row">
                  <Text mr={1}>Or </Text>
                  <Text
                    color="blue.400"
                    onClick={onUploadClick}
                    cursor="pointer"
                  >
                    Upload File
                  </Text>
                </Flex>
              </Flex>
            )}
          </Box>
          {buttonState === ButtonState.Active ? (
            <Button variant="outline" size="lg" onClick={onPredict}>
              Predict
            </Button>
          ) : buttonState === ButtonState.Loading ? (
            <Button variant="outline" size="lg" disabled>
              Predicting...
            </Button>
          ) : (
            <Button variant="outline" size="lg" disabled>
              Predict
            </Button>
          )}
        </Flex>

        {/* Right */}
        {isPredicting && (
          <Flex
            width={{ base: "100%", md: "50%" }}
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            mb={{ base: 20, md: 0 }}
          >
            <Spinner />
          </Flex>
        )}

        {isError && !isPredicting && (
          <Flex
            width={{ base: "100%", md: "50%" }}
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            mb={{ base: 20, md: 0 }}
          >
            <Heading as="h1" size="lg">
              {isError}
            </Heading>
          </Flex>
        )}

        {message && score && !isPredicting && !isError && (
          <Flex
            width={{ base: "100%", md: "50%" }}
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            mb={{ base: 20, md: 0 }}
          >
            <Heading as="h1" size="lg" mb={{ base: 2, md: 4 }}>
              Predict Result
            </Heading>

            <Heading as="h2" size="lg" mb={{ base: 3, md: 5 }}>
              {score}%
            </Heading>

            <Heading as="h3" size="md" fontWeight="normal">
              {message}
            </Heading>
          </Flex>
        )}
      </Flex>
    </DefaultLayout>
  )
}

export default Predict
