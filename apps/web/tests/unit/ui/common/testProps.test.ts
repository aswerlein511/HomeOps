import { getTestProps } from '@/ui/common';
import { describe, expect, it } from 'vitest';

describe('getTestProps', () => {
    it('returns an empty object when no dataTest is provided', () => {
        expect(getTestProps()).toEqual({});
    });

    it('returns an empty object for undefined', () => {
        expect(getTestProps(undefined)).toEqual({});
    });

    it('returns an empty object for an empty string', () => {
        expect(getTestProps('')).toEqual({});
    });

    it('returns the data-testid attribute', () => {
        expect(getTestProps('save-button')).toEqual({
            'data-testid': 'save-button',
        });
    });

    it('preserves special characters', () => {
        expect(getTestProps('user-profile.save')).toEqual({
            'data-testid': 'user-profile.save',
        });
    });

    it('preserves dash-separated values', () => {
        expect(getTestProps('dashboard-refresh-button')).toEqual({
            'data-testid': 'dashboard-refresh-button',
        });
    });

    it('does not trim whitespace automatically', () => {
        expect(getTestProps(' save ')).toEqual({
            'data-testid': ' save ',
        });
    });
});
