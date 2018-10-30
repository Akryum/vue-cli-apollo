const gql = require('graphql-tag')

module.exports = gql`
query p95TimeKeyMetrics(
  $serviceId: ID!
  $timeFrom: Timestamp!
  $timeTo: Timestamp
  $resolution: Resolution
) {
  service(id: $serviceId) {
    id
    name
    stats(from: $timeFrom, to: $timeTo, resolution: $resolution) {
      globalStats: queryStats {
        timestamp
        metrics {
          totalLatencyHistogram {
            p95Time: durationMs(percentile: 0.95)
          }
        }
      }
      queriesStats: queryStats(
        limit: 4
      ) {
        timestamp
        group: groupBy {
          queryId
          queryName
        }
        metrics {
          totalLatencyHistogram {
            p95Time: durationMs(percentile: 0.95)
          }
        }
      }
    }
  }
}
`
