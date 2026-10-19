import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgrammeIllustration from '@/components/ProgrammeIllustration';
import { content } from '@/pages/Services';

describe('ProgrammeIllustration', () => {
  it('starts on Comprendre and lets any dimension be chosen directly', () => {
    const { container } = render(<ProgrammeIllustration copy={content.fr.programme} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.map(b => b.textContent)).toEqual(['Comprendre', 'Concevoir', 'Expérimenter', 'Ancrer']);
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(buttons[2]);
    expect(buttons[2]).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Mettre une séquence à l’épreuve et ajuster la conception.')).toBeInTheDocument();
    expect(container.querySelectorAll('.prog-horizontal .prog-point')[2]).toHaveAttribute('data-on', 'true');
  });
  it('shows both strand labels as text', () => {
    render(<ProgrammeIllustration copy={content.en.programme} />);
    expect(screen.getByText('Learning')).toBeInTheDocument();
    expect(screen.getByText('Real-world practice')).toBeInTheDocument();
  });
});
