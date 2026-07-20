import type { Threshold } from '../types';

export interface PcHealthThresholds {
    cpu: Threshold;
    memory: Threshold;
    disk: Threshold;
    temperature: Threshold;
}
