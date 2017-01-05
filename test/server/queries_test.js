describe('Queries', function(){

  describe('getPrrrs', function(){
    it('should resolve with all Prrrs', function(){
      const queries = new Queries
      return queries.getPrrrs()
        .then(prrrs => {
          expect(prrrs).to.be.an('array')
        })
    })
  })

})
