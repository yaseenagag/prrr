import GitHubAPI from 'github'

export default function Github(accessToken){
  const github = new GitHubAPI({
      // optional
      debug: true,
      // protocol: "https",
      headers: {
        "user-agent": "prrr-learnersguild-org", // GitHub is happy with a unique user agent
        // "Accept": 'application/vnd.github.swamp-thing-preview+json',
        "Accept": "application/vnd.github.v3.raw",
      },
      // followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  })

  github.authenticate({
    type: "token",
    token: accessToken,
  })

  return github
}
