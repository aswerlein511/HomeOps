// src/components/ui/testProps.ts

export function getTestProps(dataTest?: string) {
    return dataTest ? { 'data-testid': dataTest } : {};
}
