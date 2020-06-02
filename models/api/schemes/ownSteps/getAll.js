const db = require ('./db')

module.exports =
  async (scheme_id) => {
    const step_records = await (
      db
      .select ('*')
      .from ('steps')
      .join ('schemes', function () {
        this.on ('steps.scheme_id', '=', 'schemes.id')
      })
      .where ({ scheme_id : scheme_id })
    )

    return step_records
  }
