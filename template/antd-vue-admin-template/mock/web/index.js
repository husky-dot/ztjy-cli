const Mock = require('mockjs')

module.exports = {
  'POST /web/auth/register': (req, res) => {
    setTimeout(() => {
      res.json(
        Mock.mock({
          returncode: '10000',
          body: {
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9icy5kc3AudGVzdFwvYXV0aFwvcmVnaXN0ZXIiLCJpYXQiOjE2MTczNTY3OTQsImV4cCI6MTYxNzM5OTk5NCwibmJmIjoxNjE3MzU2Nzk0LCJqdGkiOiJzYkFhb1JKdDh3aUx3emJlIiwic3ViIjoxNCwicHJ2IjoiZjMzNjhhMzlmMmM1MTI2ZDk2MzE1YmFkNzRjNGU4OTM4N2E1OGY0YSJ9.Q4HnCrwNxel3QldbXrBFrLWD4oyrlaagsQIpR0MUZmw',
            userName: '小智',
          },
        })
      )
    }, 1000)
  },
}
