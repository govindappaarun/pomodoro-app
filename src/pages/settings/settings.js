import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Box,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTimer } from 'src/contexts';

export default function TimerSettings() {
  const { settings, updateSettings } = useTimer();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { ...settings } });
  const toast = useToast();
  const onSubmit = values => {
    updateSettings(values);
    toast({
      title: 'Settings updated successfully',
      description: 'Its time to do more work in less time.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack alignItems={'center'} mx={'1rem'} minHeight={'calc(100vh - 140px)'}>
      <Box
        p={10}
        shadow="md"
        minWidth={'40rem'}
        borderWidth="1px"
        mb={'2rem'}
        mt="2rem"
      >
        <Heading mb={'2rem'}>Tune your Pomodoro</Heading>
        <form px={'1rem'} onSubmit={handleSubmit(onSubmit)}>
          <HStack spacing="24px">
            <FormControl isInvalid={errors.pomodoro}>
              <FormLabel htmlFor="pomodoro">Pomodoro</FormLabel>
              <Input
                id="pomodoro"
                placeholder="pomodoro"
                type="number"
                {...register('pomodoro', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.pomodoro && errors.pomodoro.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.shortbreak}>
              <FormLabel htmlFor="shortbreak">Short Break</FormLabel>
              <Input
                id="shortbreak"
                placeholder="shortbreak"
                type="number"
                {...register('shortbreak', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.shortbreak && errors.shortbreak.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.longbreak}>
              <FormLabel htmlFor="longbreak">Long Break</FormLabel>
              <Input
                id="longbreak"
                placeholder="longbreak"
                type="number"
                {...register('longbreak', {
                  required: 'This is required',
                })}
              />
              <FormErrorMessage>
                {errors.longbreak && errors.longbreak.message}
              </FormErrorMessage>
            </FormControl>
          </HStack>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Ok
          </Button>
        </form>
      </Box>
    </VStack>
  );
}
