import { PcHealth } from '../../models';

export interface PcHealthProvider {
    getHealth(): Promise<PcHealth>;
}
