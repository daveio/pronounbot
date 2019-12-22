const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');

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
  
    it('Should exit early when given incorrect command', () => {
      const command = 'My potatos are green/ripe';

      const pronouns = pronounify.extractPronouns(command);

      expect(pronouns).to.be.undefined;
    });
  
  });

  describe('listPronouns', () => {

    it('Should exit early when given incorrect command', () => {
      const replyStub = sinon.stub();
      const sendStub = sinon.stub();
      const message = {
        content: 'clearly not the right command',
        reply: replyStub,
        author: {
          send: sendStub
        }
      }

      pronounify.listPronouns(message);
      expect(replyStub.notCalled).equal(true);
      expect(sendStub.notCalled).equal(true);
    });

    it('Should reply to user and dm user when correct command used', () => {
      const replyStub = sinon.stub();
      const sendStub = sinon.stub();
      const message = {
        content: 'list available pronouns',
        reply: replyStub,
        author: {
          send: sendStub
        }
      }

      pronounify.listPronouns(message);
      expect(replyStub.calledOnce).to.equal(true);
      expect(replyStub.calledWithExactly('the list of available pronouns has been sent via private message.'))
        .to.equal(true);
      expect(sendStub.calledOnce).to.equal(true);
      //sendstub is more likely to change and a long list so not being fully checked for brevity
    });

  });

  describe('setPronouns', () => {

    it('Should exit early when given incorrect command', () => {
      const rolesStub = sinon.stub();
      const message = {
        content: 'blatantly incorrect',
        guild: {
          roles: rolesStub
        }
      }

      pronounify.setPronouns(message);

      expect(rolesStub.notCalled).to.equal(true);
    });

  });

  describe('addPronouns', () => {

    it('Should exit early when given incorrect command', () => {
      const createRoleStub = sinon.stub();
      const sendStub = sinon.stub();
      const message = {
        content: 'blatantly incorrect',
        author: {
          send: sendStub
        },
        guild: {
          createRole: createRoleStub
        }
      }

      pronounify.addPronouns(message);

      expect(sendStub.notCalled).to.equal(true);
      expect(createRoleStub.notCalled).to.equal(true);
    });

    it('Should exit early when environment variable not set', () => {
      // horrible hack
      const oldEnvVars = process.env
      process.env = '';

      const createRoleStub = sinon.stub();
      const sendStub = sinon.stub();
      const message = {
        content: 'do pronoun setup',
        author: {
          send: sendStub
        },
        guild: {
          createRole: createRoleStub
        }
      }

      pronounify.addPronouns(message);
      expect(sendStub.calledOnce).to.equal(true);
      expect(sendStub.calledOnceWithExactly('do pronoun setup isn\'t available on this instance')).to.equal(true)
      expect(createRoleStub.notCalled).to.equal(true);

      // the undoing of the horrible hack
      process.env = oldEnvVars;
    });

  });

});
