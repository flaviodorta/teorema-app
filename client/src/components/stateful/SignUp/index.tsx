import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { postSignUp } from '../../../api/auth';
import EmailInput from '../../stateless/EmailInput';
import GoogleAuthButton from '../../stateless/GoogleAuthButton';
import Logo from '../../stateless/Logo';
import PasswordInput from '../../stateless/PasswordInput';
import { useClickAnyWhere, useLocalStorage } from 'usehooks-ts';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const name = 'Jack';
  const [accessToken, setAccessToken] = useLocalStorage('access_token', '');

  useEffect(() => console.log(accessToken), [accessToken]);

  const navigate = useNavigate();

  const register = useMutation(postSignUp, {
    onSuccess: ({ data }) => {
      navigate('/account-created');
      setAccessToken(data.access_token);
    },
    onError: ({ data }) => {
      setError('Este email já possui um cadastro.');
    },
  });

  useClickAnyWhere(() => setError(''));

  const handleRegister = async () => {
    if (password === '') {
      setIsPasswordInvalid(true);
    } else {
      register.mutate({ email, password, name });
    }
  };

  useEffect(() => {
    setError('');
  }, [email]);

  useEffect(() => {
    setIsPasswordInvalid(false);
  }, [password]);

  return (
    <Container
      maxWidth='lg'
      py={{ base: 12, md: 24 }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing='8'>
        <Stack spacing='6' alignItems={'center'}>
          <Logo w={400} />
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={{ base: 'xs', md: 'sm' }}>
              Registre uma conta
            </Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Já possui uma conta?</Text>
              <Link to='/login'>
                <Button variant='link' colorScheme='blue'>
                  Entrar
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>

        <Box
          py={{ base: 0, sm: 8 }}
          px={{ base: 4, sm: 10 }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'lg' }}
          borderRadius={{ base: 'none', sm: 'md' }}
          bgColor='white'
        >
          <Stack spacing='6'>
            <Stack spacing='5'>
              <EmailInput error={error} email={email} setEmail={setEmail} />

              <PasswordInput
                password={password}
                isPasswordInvalid={isPasswordInvalid}
                setPassword={setPassword}
              />

              <HStack justify='flex-start'>
                <Checkbox defaultChecked />
                <Text fontSize='xs'>
                  Concordo com os{' '}
                  <Button
                    variant='link'
                    fontSize='xs'
                    colorScheme='blue'
                    size='sm'
                  >
                    Termos e Condições.
                  </Button>
                </Text>
              </HStack>

              <Stack spacing={6}>
                <Button colorScheme='blue' onClick={handleRegister}>
                  Registrar
                </Button>
                <Divider />
                <GoogleAuthButton>Registre com a conta Google</GoogleAuthButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUp;
