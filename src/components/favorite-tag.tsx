import { StarIcon as StartIconSolid } from '@heroicons/react/24/solid'

export default function FavoriteTag({ isFavorite }: { isFavorite: boolean }) {
  if (!isFavorite) return null

  return <StartIconSolid width={14} height={14} className='text-amber-500' />
}
