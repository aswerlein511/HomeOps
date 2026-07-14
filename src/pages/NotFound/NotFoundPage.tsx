import { Link } from 'react-router-dom';

const NotFoundPage = (): React.JSX.Element => {
    return (
        <main style={{ padding: '48px' }}>
            <h1>404</h1>

            <p>Page not found.</p>

            <Link to='/'>Return Home</Link>
        </main>
    );
};

export default NotFoundPage;
