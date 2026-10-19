import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FacilitationIllustration from '@/components/FacilitationIllustration';
import { content } from '@/pages/Services';

describe('FacilitationIllustration', () => {
  it('starts on the first dimension and lets any dimension be chosen directly', () => {
    render(<FacilitationIllustration copy={content.fr.facilitation} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Clarifier l’intention, les rôles et le mode de décision.')).toBeInTheDocument();
    fireEvent.click(buttons[3]);
    expect(buttons[3]).toHaveAttribute('aria-pressed', 'true');
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Relier la séance aux responsabilités et aux prochains pas.')).toBeInTheDocument();
  });
  it('never shows internal letter identifiers', () => {
    render(<FacilitationIllustration copy={content.en.facilitation} />);
    screen.getAllByRole('button').forEach(b => expect(b.textContent).not.toMatch(/^[A-D]\b/));
  });
});
