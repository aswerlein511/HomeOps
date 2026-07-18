import { Threshold } from '../types/Threshold';

export interface PcHealthThresholds {
    cpu: Threshold;
    memory: Threshold;
    disk: Threshold;
    temperature: Threshold;
}
