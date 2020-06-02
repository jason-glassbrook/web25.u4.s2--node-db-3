const db = require ('./db')
const get = require ('./get')

module.exports =
  async (step_id, step_value) => {
    await (
      db ('steps')
      .where ({ id : step_id })
      .update (step_value)
    )

    const step_record = await get (step_id)

    return step_record
  }
