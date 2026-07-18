import type { CSSProperties, ReactNode } from 'react';

/**
 * Base props shared by all reusable UI components.
 *
 * Every UI component should inherit from this interface.
 */
export interface BaseComponentProps {
    /**
     * Optional CSS class names.
     */
    className?: string;

    /**
     * Optional inline styles.
     */
    style?: CSSProperties;

    /**
     * Child content.
     */
    children?: ReactNode;

    /**
     * Automatically renders as:
     *
     * data-test="..."
     *
     * Used by Playwright.
     */
    dataTest?: string;

    /**
     * Accessible label.
     *
     * Example:
     * aria-label="Save Project"
     */
    ariaLabel?: string;

    /**
     * ID of an element describing this component.
     *
     * Example:
     * aria-describedby="project-help-text"
     */
    ariaDescribedBy?: string;

    /**
     * Indicates the current state to assistive technologies.
     */
    ariaBusy?: boolean;

    /**
     * Indicates the element is disabled for accessibility.
     */
    ariaDisabled?: boolean;
}
