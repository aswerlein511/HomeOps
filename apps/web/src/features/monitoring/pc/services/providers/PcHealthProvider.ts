import { ApiPcHealthProvider } from './ApiPcHealthProvider';
import { MockPcHealthProvider } from './MockPcHealthProvider';

const provider =
    import.meta.env.VITE_PC_USE_MOCK === 'true'
        ? new MockPcHealthProvider()
        : new ApiPcHealthProvider();

export class PcHealthProvider {
    async getHealth() {
        return provider.getHealth();
    }
}
