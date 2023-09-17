import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Container, Header, Link } from './Layout.styled';

export const Layout = () => {
  return (
    <Container>
      <Header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
        </nav>
      </Header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
