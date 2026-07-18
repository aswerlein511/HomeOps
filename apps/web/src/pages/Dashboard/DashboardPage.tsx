import { PcHealthCard } from '@/features/monitoring/pc';

const DashboardPage = (): React.JSX.Element => {
    return (
        <main style={{ padding: '48px' }}>
            <h1>Dashboard</h1>

            <PcHealthCard />
        </main>
    );
};

export default DashboardPage;
