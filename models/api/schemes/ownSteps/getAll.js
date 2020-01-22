const db = require ('./db')

module.exports =
  async () => {
    const records = await (
      db
      .select ('*')
      .from ('steps')
      .join ('schemes', function () {
        this.on ('steps.scheme_id', '=', 'schemes.scheme_id')
      })
    )

    return records
  }
