const {strict} = require("assert")
const assert = require("assert")
strict.deepEqual("1", "1") // uses === operator
// AssertionError error
const {message} = new assert.AssertionError({
    actual: 1,
    expected: 1,
    operator: 'strictEqual'
})
try{
   assert.strictEqual(1,1)
}catch(err)
{
    assert(err instanceof assert.AssertionError)
    assert.strictEqual(err.message, message);
    assert.strictEqual(err.name, 'AssertionError');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 2);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
}
