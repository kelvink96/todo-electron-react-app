import { useRouteError } from 'react-router-dom'
import { ReactElement } from 'react'

export const GenericErrorPage = (): ReactElement | null => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const error: never = useRouteError()
  console.error(error)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error['statusText'] || error['message']}</i>
      </p>
    </div>
  )
}
