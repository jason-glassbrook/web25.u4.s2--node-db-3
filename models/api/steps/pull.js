const db = require ('./db')
const get = require ('./get')

module.exports =
  async (step_id) => {
    const step_record = await get (step_id)

    await (
      db ('steps')
      .where ({ id : step_id })
      .delete ()
    )

    return step_record
  }
