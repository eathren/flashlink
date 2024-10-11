import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"

interface InputWithLabelProps {
  type: string
  name: string
  placeholder: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputWithLabel({
  type,
  name,
  placeholder,
  label,
  value,
  onChange,
}: InputWithLabelProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export { InputWithLabel }
