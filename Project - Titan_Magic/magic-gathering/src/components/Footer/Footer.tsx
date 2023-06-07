const Footer = () => (
  <footer className="mt-auto dark:bg-gray-900">
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <div className="py-6 text-center sm:w-2/3">
          <p className="text-sm text-gray-600 dark:text-gray-200">
            Mdb-Gathering {new Date().getFullYear()} by{' '}
            <a
              href="https://github.com/tailwindcomponents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Cody Roberts
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
