import { Divider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentRoute from './components/stateless/routes/StudentRoute';
import { ROUTES_PATH } from './constants';
import AccountCreatedSuccesfulPage from './pages/AccountCreatedSuccessful';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { store } from './redux/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className='h-screen w-screen relative bg-gray-50'>
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES_PATH.SIGN_IN} element={<SignInPage />} />
              <Route path={ROUTES_PATH.SIGN_UP} element={<SignUpPage />} />
              <Route
                path={ROUTES_PATH.ACCOUNT_CREATED}
                element={<AccountCreatedSuccesfulPage />}
              />

              <Route path='student' element={<StudentRoute />}>
                <Route
                  path='dashboard'
                  element={<div className='w-full h-full bg-red-600'></div>}
                />
              </Route>

              <Route path='*' element={<SignInPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
