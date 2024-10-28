import { render, screen } from '@testing-library/react';
import AvatarBox from '@/app/(with-navbar)/(profile)/my-products/_components/AvatarBox';

describe('AvatarBox Component', () => {
    test('renders with given name and points', () => {
        render(<AvatarBox name="John Doe" points={100} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('100 bonus points')).toBeInTheDocument();
    });

    test('renders with given avatar src', () => {
        const src = 'https://example.com/avatar.jpg';
        render(<AvatarBox src={src} />);
        const avatar = screen.getByRole('img');
        expect(avatar).toHaveAttribute('src', src);
    });
});