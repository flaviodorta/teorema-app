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
import EmailInput from '../../stateless/EmailInput';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../stateless/Logo';
import PasswordInput from '../../stateless/PasswordInput';
import GoogleAuthButton from '../../stateless/GoogleAuthButton';
import { ROUTES_PATH } from '../../../constants';
import { useMutation, useQuery } from 'react-query';
import { postSignIn } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import {
  setEmail,
  setId,
  setName,
  setRole,
} from '../../../redux/user/user.slice';
import { useClickAnyWhere } from 'usehooks-ts';

const SignIn = () => {
  const [inputedEmail, setInputedEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInMutation = useMutation(postSignIn, {
    onSuccess: ({ data }) => {
      dispatch(setEmail(data.user.email));
      dispatch(setId(data.user.id));
      dispatch(setRole(data.user.role));
      dispatch(setName(data.user.name));
      console.log(data);

      if (data.user.role === 'student') {
        console.log('here 2');
        navigate('/' + data.user.role + '/dashboard');
      }
    },
    onError: () => {
      setError('Email ou senha inválidos');
    },
  });

  const handleSignIn = () => {
    console.log('here');
    if (inputedEmail !== '' && password !== '') {
      signInMutation.mutate({ email: inputedEmail, password });
    }
  };

  useClickAnyWhere(() => setError(''));

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
              Entre na sua conta
            </Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Não possui uma conta ainda?</Text>
              <Link to={ROUTES_PATH.SIGN_UP}>
                <Button variant='link' colorScheme='blue'>
                  Cadastrar
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
              <EmailInput
                error={error}
                email={inputedEmail}
                setEmail={setInputedEmail}
              />

              <PasswordInput password={password} setPassword={setPassword} />

              <HStack justify='space-between'>
                <Checkbox defaultChecked>Lembrar-me</Checkbox>
                <Button variant='link' colorScheme='blue' size='sm'>
                  Esqueceu a senha?
                </Button>
              </HStack>

              <Stack spacing={6}>
                <Button colorScheme='blue' onClick={handleSignIn}>
                  Entrar
                </Button>
                <Divider />
                <GoogleAuthButton>Entre com a conta Google</GoogleAuthButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignIn;
