import MainNavBar from "../components/NavBar/MainNavBar";

function Home() {
  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 ml-auto">
        <h1 className="text-white text-center">Welcome to Foot2gether</h1>
        <p className="text-center">
          Enjoy watching Football Matches with Fans from around the Globe!
        </p>
        <p className="text-center">
          <a href="matches.html" className="btn btn-primary py-3 px-4 mr-3">
            View Matches
          </a>
        </p>
      </div>
    </div>
  );

  return <MainNavBar pageName="Home" NavBarContent={NavBarContent} />;
}

export default Home;
