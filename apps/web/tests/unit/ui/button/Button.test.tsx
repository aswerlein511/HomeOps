import { describe, expect, it, vi } from 'vitest';

import { fireEvent, renderWithProviders, screen } from '../../../utils/renderWithProviders';

import { Button } from '@/ui';

describe('Button', () => {
    it('renders button text', () => {
        renderWithProviders(<Button>Save</Button>);

        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('renders children', () => {
        renderWithProviders(
            <Button>
                <span>Nested Child</span>
            </Button>,
        );

        expect(screen.getByText('Nested Child')).toBeInTheDocument();
    });

    it('renders the data-test attribute', () => {
        renderWithProviders(<Button dataTest='save-button'>Save</Button>);

        expect(screen.getByRole('button')).toHaveAttribute('data-test', 'save-button');
    });

    it('supports custom class names', () => {
        renderWithProviders(<Button className='custom-class'>Save</Button>);

        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('is disabled when disabled is true', () => {
        renderWithProviders(<Button disabled>Save</Button>);

        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('calls onClick exactly once', () => {
        const onClick = vi.fn();

        renderWithProviders(<Button onClick={onClick}>Save</Button>);

        fireEvent.click(screen.getByRole('button'));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick while disabled', () => {
        const onClick = vi.fn();

        renderWithProviders(
            <Button disabled onClick={onClick}>
                Save
            </Button>,
        );

        fireEvent.click(screen.getByRole('button'));

        expect(onClick).not.toHaveBeenCalled();
    });

    it("defaults to type='button'", () => {
        renderWithProviders(<Button>Save</Button>);

        expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('supports submit buttons', () => {
        renderWithProviders(<Button type='submit'>Submit</Button>);

        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('supports reset buttons', () => {
        renderWithProviders(<Button type='reset'>Reset</Button>);

        expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
});
