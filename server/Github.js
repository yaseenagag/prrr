import GitHubAPI from 'github'

export default function Github(accessToken){
  const github = new GitHubAPI({
      // optional
      debug: true,
      // protocol: "https",
      // host: "github.my-GHE-enabled-company.com", // should be api.github.com for GitHub
      // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
      headers: {
        "user-agent": "prrr-learnersguild-org" // GitHub is happy with a unique user agent
      },
      // Promise: require('bluebird'),
      // followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
      // timeout: 5000
  })

  github.authenticate({
    type: "token",
    token: accessToken,
  })

  return github
}
