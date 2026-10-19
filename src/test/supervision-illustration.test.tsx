import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SupervisionIllustration from '@/components/SupervisionIllustration';
import { content } from '@/pages/Services';

describe('SupervisionIllustration', () => {
  it('starts on the first perspective and lets any perspective be chosen directly', () => {
    const { container } = render(<SupervisionIllustration copy={content.fr.supervision} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.map(b => b.textContent)).toEqual(['Votre vécu', 'La relation', 'Le contexte et le cadre', 'Vos ressources']);
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(buttons[2]);
    expect(buttons[2]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(container.querySelector('.sup')).toHaveAttribute('data-active', 'context');
    expect(screen.getByText('Quels mandats, rapports de pouvoir ou enjeux éthiques influencent votre pratique ?')).toBeInTheDocument();
  });
  it('shows the central practice label and no numbering in English', () => {
    render(<SupervisionIllustration copy={content.en.supervision} />);
    expect(screen.getByText('Your practice')).toBeInTheDocument();
    screen.getAllByRole('button').forEach(b => expect(b.textContent).not.toMatch(/^\d/));
  });
});
