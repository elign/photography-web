import SocialShare from "./SocialShare";

export default function Footer() {
  return (
    <>
      {/*Footer container*/}
      <footer className="bg-white text-center">
        <div className="container px-6 pt-6">
          <div className="mb-6 flex justify-center">
            <SocialShare />
          </div>
        </div>
        {/*Copyright section*/}
        <div
          className="p-4 text-center bg-gray-100"
        >
          © 2023 Copyright:
          <a className="text-whitehite" href="https://tailwind-elements.com/">
            Tailwind Elements
          </a>
        </div>
      </footer>
    </>
  );
}
