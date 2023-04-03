import {
  Button,
  ButtonGroup,
  HStack,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuthButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <ButtonGroup variant='outline' spacing='4' width='full'>
      <Button w='full'>
        <HStack justifyContent='space-between'>
          <FcGoogle size='24px' />
          <Text>{children}</Text>
        </HStack>
      </Button>
    </ButtonGroup>
  );
};

export default GoogleAuthButton;
