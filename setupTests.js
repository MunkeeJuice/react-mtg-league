
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with Testing Library matchers
expect.extend(matchers);

// Reset any request handlers and modules before each test
beforeEach(() => {
    vi.resetModules();
});

// Clean up after each test case
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetAllMocks();
});

// Mock IntersectionObserver if not available
if (typeof window !== 'undefined') {
    window.IntersectionObserver = class IntersectionObserver {
        constructor() {
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn(),
            };
        }
    };
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
    constructor() {
        return {
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        };
    }
};

// Suppress console errors during tests
console.error = vi.fn();