import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';

interface Props {
  password: string;
  isPasswordIncorrect?: boolean;
  isPasswordInvalid?: boolean;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ password, isPasswordIncorrect, isPasswordInvalid, setPassword }, ref) => {
    const { isOpen, onToggle } = useDisclosure();
    const inputRef = useRef<HTMLInputElement>(null);
    const mergeRef = useMergeRefs(inputRef, ref);

    const onClickReveal = () => {
      onToggle();
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value);

    return (
      <FormControl
        isInvalid={isPasswordInvalid}
        display='flex'
        flexDirection='column'
      >
        <FormLabel htmlFor='password'>Password</FormLabel>
        <InputGroup>
          <InputRightElement>
            <IconButton
              variant='link'
              colorScheme='blue'
              aria-label={isOpen ? 'Esconder senha' : 'Mostrar senha'}
              onClick={onClickReveal}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
            />
          </InputRightElement>
          <Input
            value={password}
            ref={mergeRef}
            name='password'
            type={isOpen ? 'text' : 'password'}
            autoComplete='current-password'
            onChange={handleInputChange}
          />
          {!isPasswordIncorrect ?? (
            <FormErrorMessage>
              Senha ou email estão incorretos.
            </FormErrorMessage>
          )}
          {isPasswordInvalid ?? (
            <FormErrorMessage>
              Digite uma senha com pelo menos 8 caracteres.
            </FormErrorMessage>
          )}
        </InputGroup>
      </FormControl>
    );
  }
);

export default PasswordInput;
