import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTimer } from 'src/contexts';

export default function TimerSettings({
  isOpen,
  onClose,
  updateSettings,
  ...rest
}) {
  const { settings } = useTimer();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { ...settings } });
  const onSubmit = values => {
    updateSettings(values);
  };

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={'lg'}
      >
        <ModalOverlay />
        <ModalContent p={'2rem'}>
          <ModalHeader>Change Pomodoro Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
