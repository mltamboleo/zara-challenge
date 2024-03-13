import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Header from '../app/components/header/index.tsx'

jest.mock('next/router', () => ({
  useRouter() {},
}));

describe('Header Component', () => {
  it('Renders Header', () => {
    const { container } = render(<Header />)
    expect(container).toMatchSnapshot()
  })
})