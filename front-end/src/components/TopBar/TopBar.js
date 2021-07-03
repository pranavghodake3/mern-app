import logo from "../../twitter-logo.jpg";

const TopBar = () => {
    return (
        <div className="row header-row">
            <div className="col-sm hor-column">
            <div className="logo-div">
                <img className="logo" src={logo} alt="logo" />
            </div>
            </div>
            <div className="col-sm hor-column">Home</div>
            <div className="col-sm hor-column">
                <input type="text" className="search" placeholder="Search" />
            </div>
        </div>
    )
}

export default TopBar;