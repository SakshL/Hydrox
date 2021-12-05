  module.exports = {
  name: "gmail",
  description: "gmail command",
  category: "gmail",
  run: async (client, message, args) => {
    // Destructure the things we need out of props
students = args;
    const author = message.author;
    let email = ''

    // If no arguments, send existing information
    if (args.length === 0) {
      const student = await students.get(author.id)
      if (!student) {
        return author.send(
          'You do not have any existing information. Type `!help student` to learn how to update your information.'
        )
      }
      return author.send(`Here is your current Email: ${student.email}`)
    }

    // Sanitize ID and email, return rich error messages for incorrectly formatted information
    if (args[0].match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g)) {
      // This is an email address
      email = args[0]
    } else {
      return author.send('You did not correctly enter your email address!')
    }

    // Append information to the client student object
    const student = await students.get(author.id)
    student.email = email

    await students.set(author.id, student)

    // Return success message
    author.send('You have successfully updated your information!')
  }
}