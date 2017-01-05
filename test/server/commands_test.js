describe('Commands', function(){

  describe('createUser', function(){
    it('should insert a user into the database', function(){
      const commands = new Commands
      return commands.createUser({
        name: 'Graham Campbell',
        email: 'graham@alt-three.com',
        avatar_url: 'https://avatars1.githubusercontent.com/u/2829600?v=3&s=460',
        github_id: 123456,
        github_username: 'Graham Campbell',
        github_access_token: 'FAKE_GITHUB_ACCESS_TOKEN',
        github_refresh_token: null,
      })
      .then(user => {
        expect(user).to.be.an('object')
        expect(user.name                ).to.eql('Graham Campbell')
        expect(user.email               ).to.eql('graham@alt-three.com')
        expect(user.avatar_url          ).to.eql('https://avatars1.githubusercontent.com/u/2829600?v=3&s=460')
        expect(user.github_id           ).to.eql(123456)
        expect(user.github_username     ).to.eql('Graham Campbell')
        expect(user.github_access_token ).to.eql('FAKE_GITHUB_ACCESS_TOKEN')
        expect(user.github_refresh_token).to.eql(null)
        expect(user.created_at).to.be.a('date')
        expect(user.updated_at).to.be.a('date')
      })
    })
  })

  context('as Nico', function(){
    let commands
    beforeEach(function(){
      return (new Commands()).createUser({
        name: 'Nico',
        email: 'nicosm310@gmail.com',
        avatar_url: 'https://avatars0.githubusercontent.com/u/18688343?v=3&s=460',
        github_id: 987654,
        github_username: 'nicosesma',
        github_access_token: 'FAKE_GITHUB_ACCESS_TOKEN',
        github_refresh_token: null,
      })
      .then(nico => {
        commands = new Commands(nico)
      })
    })

    describe('createPrrr', function(){

      context('when the pull request doesnt exist', function(){
        let pullRequests
        beforeEach(function(){
          pullRequests = sinon.stub(commands.github.pullRequests)
          pullRequests.get.returns(new Promise((resolve, reject) => {
            reject(new Error)
          }));
        })
        it('should reject with "Pull Request Not Found"', function(){
          return commands.createPrrr({
            owner: 'nicosesma',
            repo: 'floworky',
            number: 42,
          })
          .catch(error => {
            expect(error.message).to.eql('Pull Request Not Found')
          })
        })
      })

      context('when the pull request exists', function(){
        let pullRequests
        beforeEach(function(){
          pullRequests = sinon.stub(commands.github.pullRequests)
          pullRequests.get.returns(new Promise((resolve, reject) => {
            resolve({
              number: 42,
              base: {
                repo: {
                  name: 'floworky',
                  owner: {
                    login: 'nicosesma',
                  },
                }
              }
            })
          }));
        })

        context('and Nico is not a collaborator on the repo', function(){
          let repos
          beforeEach(function(){
            repos = sinon.stub(commands.github.repos)
            repos.checkCollaborator.returns(new Promise((resolve, reject) => {
              reject(new Error)
            }));
          })
          it('should reject with "You are not a collaborator on..."', function(){
            return commands.createPrrr({
              owner: 'nicosesma',
              repo: 'floworky',
              number: 42,
            })
            .catch(error => {
              expect(error.message).to.eql('You are not a collaborator on nicosesma/floworky')
            })
          })
        })

        context('and Nico is a collaborator on the repo', function(){
          let repos
          beforeEach(function(){
            repos = sinon.stub(commands.github.repos)
            repos.checkCollaborator.returns(new Promise((resolve, reject) => {
              resolve()
            }));
          })

          context('and a conflicting Prrr already exists', function(){
            beforeEach(function(){
              return commands.createRecord('pull_request_review_requests',{
                owner: 'nicosesma',
                repo: 'floworky',
                number: 42,
                requested_by: 'nicosesma',
                created_at: new Date,
                updated_at: new Date,
                archived_at: new Date,
              })
            })
            it('should unarchive the pre-existing Prrr and resolve with it', function(){
              return commands.createPrrr({
                owner: 'nicosesma',
                repo: 'floworky',
                number: 42,
              })
              .then(prrr => {
                expect(prrr).to.be.an('object')
                expect(prrr.id).to.be.a('number')
                expect(prrr.owner).to.eql('nicosesma')
                expect(prrr.repo).to.eql('floworky')
                expect(prrr.number).to.eql(42)
                expect(prrr.requested_by).to.eql('nicosesma')
                expect(prrr.claimed_by).to.eql(null)
                expect(prrr.claimed_at).to.eql(null)
                expect(prrr.created_at).to.be.a('date')
                expect(prrr.updated_at).to.be.a('date')
                expect(prrr.archived_at).to.eql(null)
              })
            })
          })

          context('and a conflicting Prrr doesn\'t already exist', function(){
            it('should create the Prrr', function(){
              return commands.createPrrr({
                owner: 'nicosesma',
                repo: 'floworky',
                number: 42,
              })
              .then(prrr => {
                expect(prrr).to.be.an('object')
                expect(prrr.id).to.be.a('number')
                expect(prrr.owner).to.eql('nicosesma')
                expect(prrr.repo).to.eql('floworky')
                expect(prrr.number).to.eql(42)
                expect(prrr.requested_by).to.eql('nicosesma')
                expect(prrr.claimed_by).to.eql(null)
                expect(prrr.claimed_at).to.eql(null)
                expect(prrr.created_at).to.be.a('date')
                expect(prrr.updated_at).to.be.a('date')
                expect(prrr.archived_at).to.eql(null)
              })
            })
          })


        })

      })
    })
  })


})
