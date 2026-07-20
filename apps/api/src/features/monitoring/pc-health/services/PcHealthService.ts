import { MockPcHealthProvider } from '../providers/MockPcHealthProvider';
import { PcHealthProvider } from '../providers/PcHealthProvider';
import { SystemInformationProvider } from '../providers/SystemInformationProvider';

export class PcHealthService {
    private readonly provider: PcHealthProvider;

    constructor() {
        const provider = process.env.PC_HEALTH_PROVIDER?.toLowerCase() ?? 'mock';

        switch (provider) {
            case 'system':
                this.provider = new SystemInformationProvider();
                break;

            case 'mock':
            default:
                this.provider = new MockPcHealthProvider();
                break;
        }
    }

    public async getHealth() {
        return this.provider.getHealth();
    }
}
