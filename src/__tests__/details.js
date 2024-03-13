import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import CharacterDetails from '../pages/index.tsx'

jest.mock('next/router', () => ({
  useRouter() {},
}));

describe('Details Page', () => {
  it('Renders Details', () => {
    const { container } = render(<CharacterDetails />)
    expect(container).toMatchSnapshot()
  })
})
