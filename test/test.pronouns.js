const mocha = require('mocha');
const chai = require('chai');
const pronounify = require('../src/pronouns');

const expect = chai.expect;
const it = mocha.it;
const describe = mocha.describe;


describe('pronouns', () => {

  describe('extractCommand', () => {

    it('Should return she/her when command is correctly typed and pronouns are in list', () => {
      const command = 'My pronouns are she/her';

      const pronouns = pronounify.extractPronouns(command);

      expect(pronouns).to.equal('she/her')
    });

    it('Should return she/her when pronoun casing is mixed', () => {
      const command = 'My pronouns are She/Her';

      const pronouns = pronounify.extractPronouns(command);

      expect(pronouns).to.equal('she/her')
    });

    it('Should return undefined when command is correctly typed but pronouns are not in list', () => {
      const command = 'My pronouns are rutabega/corn';

      const pronouns = pronounify.extractPronouns(command);
  
      expect(pronouns).to.be.undefined;
    });
  
    it('Should return undefined when command is malformed', () => {
      const command = 'My potatos are green/ripe';

      const pronouns = pronounify.extractPronouns(command);

      expect(pronouns).to.be.undefined;
    });
  
  });

});
