import useSWR from 'swr'
import { useRouter } from 'next/router'
import { getToken } from './userAuth'

const useUserScores = () => {
  const router = useRouter()
  const { id } = router.query

  const url = id ? `${process.env.NEXT_PUBLIC_API_URL}/golfers/${id}/scores` : null

  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.user)
  }

  const { data, error } = useSWR(url, fetcher)

  return {
    name: data?.name || '',
    scores: data?.scores || [],
    error: error && error.message,
  }
}

export default useUserScores
