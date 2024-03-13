import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import FavButton from '../app/components/favButton/index.tsx'

jest.mock('next/router', () => ({
  useRouter() {},
}));

describe('Fav Button Component', () => {
  it('Renders Fav Button', () => {
    const { container } = render(<FavButton />)
    expect(container).toMatchSnapshot()
  })
})
