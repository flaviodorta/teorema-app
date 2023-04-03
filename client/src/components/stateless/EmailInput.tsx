import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  email: string;
  emailExists?: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailInput = ({ email, emailExists, setEmail }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <FormControl isInvalid={emailExists} display='flex' flexDirection='column'>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={email} onChange={handleInputChange} />

      <FormErrorMessage>Este email já possui um cadastro.</FormErrorMessage>
    </FormControl>
  );
};

export default EmailInput;
