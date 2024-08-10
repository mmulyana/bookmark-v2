type Props = {
  color: string
  name: string
}
export default function Badge({ color, name }: Props) {
  if (name === '' || name == undefined) return null
  return (
    <div
      className={[
        'px-2 py-0.5 rounded-full border text-xs capitalize',
        borders[color ?? '1'],
        background[color ?? '1'],
        colors[color ?? '1'],
      ].join(' ')}
    >
      {name}
    </div>
  )
}

type Color = {
  [key: string]: string
}

const background: Color = {
  '1': 'bg-blue-500/10',
  '2': 'bg-red-500/10',
  '3': 'bg-amber-500/10',
  '4': 'bg-sky-500/10',
  '5': 'bg-teal-500/10',
}

const colors: Color = {
  '1': 'text-blue-700',
  '2': 'text-red-700',
  '3': 'text-amber-700',
  '4': 'text-sky-700',
  '5': 'text-teal-700',
}

const borders: Color = {
  '1': 'border-blue-500',
  '2': 'border-red-500',
  '3': 'border-amber-500',
  '4': 'border-sky-500',
  '5': 'border-teal-500',
}
