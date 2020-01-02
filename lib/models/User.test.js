const User = require('./User.js');

describe('User tests', () => {
  it('should have a required email', () => {
    const user = new User();
    const { errors } = user.validateSync();
    expect(errors.email.message).toEqual('Path `email` is required.');
  });
  it('should have a required passwordHase', () => {
    const user = new User();
    const { errors } = user.validateSync();
    expect(errors.passwordHash.message).toEqual('Path `passwordHash` is required.');
  });
  it('should be able to hash a password', () => {
    const user = new User({
      email: 'test@test.test',
      password: 'password'
    });
    expect(user.passwordHash).toEqual(expect.any(String));
  });
});
