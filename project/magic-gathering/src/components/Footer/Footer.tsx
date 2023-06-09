import React from "react"

const Footer = ({ height }) => {
  return (
    <footer
      className="mt-auto bg-menu flex justify-center"
      style={{ height: `${height}px` }}
    >
      <div className="container m-auto">
        <div>
          <div className="text-center m-auto sm:w-2/3 flex justify-center content-center">
            <p className="text-sm text-txt">
              Titan-Magic 2023 by{" "}
              <a
                href="https://github.com/pithlyx/titan-magic"
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
  )
}

export default Footer
