export type ChoiceVariant = 'default' | 'correct' | 'wrong' | 'dimmed'

type Props = {
  char: string
  variant: ChoiceVariant
  disabled: boolean
  onSelect: (char: string) => void
}

export function ChoiceButton({ char, variant, disabled, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`choice choice--${variant}`}
      disabled={disabled}
      onClick={() => onSelect(char)}
    >
      {char}
    </button>
  )
}
