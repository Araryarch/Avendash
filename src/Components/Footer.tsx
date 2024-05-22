interface FooterProps {
  addClass?: string
}

const Footer = ({ addClass }: FooterProps) => {
  return (
    <footer
      className={`${addClass} footer footer-center bg-base-300 p-4 text-base-content`}
    >
      <aside>
        <p>
          Copyright © 2024 - All right reserved by{' '}
          <a href="https://github.com/Araryarch/Avendash">Araryarch</a>
        </p>
      </aside>
    </footer>
  )
}

export default Footer
