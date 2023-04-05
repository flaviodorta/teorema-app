import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  email: string;
  error?: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailInput = ({ email, error, setEmail }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <FormControl
      isInvalid={error !== '' ? true : false}
      display='flex'
      flexDirection='column'
    >
      <FormLabel>Email</FormLabel>
      <Input type='email' value={email} onChange={handleInputChange} />

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default EmailInput;
