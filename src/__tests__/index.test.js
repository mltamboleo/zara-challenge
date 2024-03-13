import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import CharactersList from '../pages/index.tsx'

jest.mock('next/router', () => ({
  useRouter() {},
}));

describe('Home Page', () => {
  it('Renders Home', () => {
    const { container } = render(<CharactersList />)
    expect(container).toMatchSnapshot()
  })
})
