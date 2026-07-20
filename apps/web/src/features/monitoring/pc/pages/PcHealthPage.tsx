import { PcHealthCard } from '../components';
import { usePcHealth } from '../hooks';

export default function PcHealthPage() {
    const { health, loading } = usePcHealth();

    if (loading) {
        return <div>Loading PC Health...</div>;
    }

    if (!health) {
        return <div>No PC health data available.</div>;
    }

    return <PcHealthCard health={health} />;
}
