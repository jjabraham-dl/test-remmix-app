import { render, screen } from '@testing-library/react';

describe('App', () => {
    it('renders headline', () => {
        render(<div data-testid="React">Hi</div>);

        screen.debug();

        expect(screen.getByTestId('React')).toHaveTextContent('Hi');
    });
});