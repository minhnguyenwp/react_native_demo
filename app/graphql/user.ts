import { gql } from "@apollo/client"

const SIGNUP_MUTATION = gql`
  mutation SignUpWithEmail($name: NonEmptyString!, $email: EmailAddress!, $password: Password!) {
    signUpWithEmail(email: $email, password: $password, name: $name) {
      user {
        id
        email
        name
        facebookId
        googleId
        appleId
      }
      accessToken
      refreshToken
    }
  }
`

const QUERY_IS_EXISTING_EMAIL = gql`
  query IsExistingUserByEmail($email: EmailAddress!) {
    isExistingUserByEmail(email: $email)
  }
`

const LOGIN_MUTATION = gql`
  mutation loginWithEmail($email: EmailAddress!, $password: NonEmptyString!) {
    loginWithEmail(email: $email, password: $password) {
      user {
        id
        email
        name
        facebookId
        googleId
        appleId
      }
      accessToken
      refreshToken
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($name: NonEmptyString!, $email: EmailAddress!) {
    updateUser(name: $name, email: $email) {
      id
      name
      email
      facebookId
      googleId
      appleId
    }
  }
`

export { SIGNUP_MUTATION, QUERY_IS_EXISTING_EMAIL, LOGIN_MUTATION, UPDATE_USER_MUTATION }
