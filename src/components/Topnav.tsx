import { faBell } from "@fortawesome/free-regular-svg-icons"
import {
    faMagnifyingGlass,
    faCaretDown,
    faBars,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch } from "react-redux"
import { openSidebar } from "../redux/userReducer"
import "../styles/css/App.css"

export default function Topnav() {
    const dispatch = useDispatch()
    return (
        <div style={{ position: "fixed", width: "100%", zIndex: 6 }}>
            <div className="Topnav">
                <div className="sidenav-btn">
                    <FontAwesomeIcon
                        className="btn"
                        icon={faBars}
                        onClick={() => dispatch(openSidebar())}
                    />
                </div>
                <div className="logo">
                    <img src="/lendsqr-logo.svg" alt="logo" />
                </div>
                <div className="search-cont">
                    <div className="search">
                        <input placeholder="Search for anything" />
                        <div className="search-btn">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                    </div>
                </div>
                <div className="user-info">
                    <p>Docs</p>
                    <FontAwesomeIcon
                        icon={faBell}
                        style={{ cursor: "pointer" }}
                    />
                    <img src="/profile-pic.svg" alt="profile-pic" />
                    <div>
                        <span>Adedeji</span>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </div>
            </div>
        </div>
    )
}
