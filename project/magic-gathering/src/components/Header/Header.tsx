import NavButton from "../reuseable/Button";
import { SiteLogo } from "../assets/Logos";

const Header = ({ height }: any) => {
  const headerStyle = {
    height: `${height}px`,
  };

  return (
    <div
      id="header-container"
      className=" flex justify-center content-center bg-menu lg:w-full lg:top-0 lg:z-50 lg:left-0 sticky top-0"
      style={headerStyle}
    >
      <div id="header-inner-container" className="container px-10 m-auto">
        <div
          id="header-content"
          className="flex flex-col lg:items-center lg:justify-center lg:flex-row lg:space-x-4"
        >
          <div
            id="logo-section"
            className="lg:w-1/2 flex flex-col items-center content-center sm:flex-row"
          >
            <SiteLogo
              id="logo"
              className="object-cover object-left h-12 fill-primary"
            />
            <h1
              id="site-title"
              className="flex items-center pl-8 text-2xl text-txt dark:text-gray-300 lg:mt-0 sm:ml-2 sm:border-l sm:border-gray-400"
            >
              Titan-Magic
            </h1>
          </div>

          <div
            id="navigation-section"
            className="justify-end m-auto w-1/2 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 sm:items-center sm:justify-center lg:justify-right md:justify-center md:items-center lg:justify-end lg:items-center xl:justify-end xl:items-center"
          >
            <NavButton label="New Deck" linkTo="/route/carddisplay/deckdisplay" />
            <NavButton label="View Decks" linkTo="/route/deckdisplay/carddisplay" />
            <NavButton label="Search" linkTo="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
