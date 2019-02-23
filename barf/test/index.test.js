const { rest, assert } = require('../index')
const fsUtil = require('../fsUtil')

const config = fsUtil.getYaml('barf/test/config.yaml')

describe('user', () => {
  it('/users', async () => {
    const args = {}
    const options = { config }
    const result = await rest.users(args, options)
    assert.equal(Array.isArray(result), true, 'return value is an array')
  })
})

describe('include rest', () => {
  it('testAsync', async () => {
    const args = { a: 'b' }
    const result = await rest.testAsync(args)
    assert.deepEqual(result, args, 'test async')
  })

  it('testPromise', async () => {
    const args = { success: true }
    const result = await rest.testPromise(args)
    assert.deepEqual(result, args, 'test promise')

    args.success = false
    try {
      await rest.testPromise(args)
    } catch (err) {
      assert.deepEqual(err, args, 'test promise')
    }
  })
})