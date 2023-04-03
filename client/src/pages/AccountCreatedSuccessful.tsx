import {
  AbsoluteCenter,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useTimeout } from 'usehooks-ts';

const AccountCreatedSuccesfulPage = () => {
  const navigate = useNavigate();
  useTimeout(() => navigate('/login', { replace: true }), 4000);

  return (
    <AbsoluteCenter>
      <VStack spacing={6}>
        <Heading as='h2'>Conta criado com sucesso!</Heading>
        <Text fontSize='18'>
          Você está sendo redirecionado para a página de Entrar.
        </Text>
        <Spinner size='lg'></Spinner>
      </VStack>
    </AbsoluteCenter>
  );
};

export default AccountCreatedSuccesfulPage;
