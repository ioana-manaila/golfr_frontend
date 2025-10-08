import Layout from '../../../components/Layout'
import ScoreCard from '../../../components/ScoreCard'
import useUserScores from '../../../lib/useUserScores'

const Profile = () => {
  const { name, scores, error } = useUserScores()

  return (
    <Layout>
      <>
        {error ? (
          error
        ) : (
          <>
            <h2>{name}</h2>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={name}
              />
            ))}
          </>
        )}
      </>
    </Layout>
  )
}

export default Profile
