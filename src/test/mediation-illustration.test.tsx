import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MediationIllustration from '@/components/MediationIllustration';
import { content } from '@/pages/Services';

describe('MediationIllustration', () => {
  it('starts on the framework and lets any dimension be chosen directly', () => {
    const { container } = render(<MediationIllustration copy={content.en.mediation} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.map(b => b.textContent)).toEqual(['Establish a framework', 'Hear each experience', 'Clarify needs', 'Explore what follows']);
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(buttons[3]);
    expect(buttons[3]).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('.med')).toHaveAttribute('data-active', 'follow');
    expect(screen.getByText('Consider a possible agreement, boundaries, a different route or ending the process.')).toBeInTheDocument();
  });
});
