import {
    faEllipsisVertical,
    faEye,
    faUserCheck,
    faUserXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserProps } from "../redux/userReducer"

export default function DashboardUser(user: UserProps) {
    const [menu, setMenu] = useState(false)
    const [userState, setUserState] = useState("Pending")
    const userMenu = useRef<HTMLDivElement>(null)
    const userDiv = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        document
            .getElementById("body-2")
            ?.addEventListener("click", handleClick)
    }, [])

    function handleClick(e: any) {
        if (!userMenu.current?.contains(e.target)) {
            setMenu(false)
        }
    }

    function handleMenu(e: any) {
        if (!menu) {
            setMenu(true)
        }
    }

    const UserMenu: FC = () => {
        return (
            <div ref={userMenu} className="user-menu">
                <div className="user-menu-cont">
                    <div onClick={() => navigate(`/user/${user.id}`)}>
                        <FontAwesomeIcon icon={faEye} />
                        <span>View Details</span>
                    </div>
                    <div
                        onClick={() => {
                            setUserState("Blacklisted")
                            setMenu(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faUserXmark} />
                        <span>Blacklist User</span>
                    </div>
                    <div
                        onClick={() => {
                            setUserState("Active")
                            setMenu(false)
                        }}
                    >
                        <FontAwesomeIcon icon={faUserCheck} />
                        <span>Activate User</span>
                    </div>
                </div>
            </div>
        )
    }

    const date = new Date(user.createdAt)

    return (
        <div
            ref={userDiv}
            className="user"
            id="user"
            style={{ width: userDiv.current?.scrollWidth }}
        >
            <span>{user.orgName}</span>
            <span>{user.userName}</span>
            <span>{user.email}</span>
            <span>{user.phoneNumber}</span>
            <span>{date.toDateString()}</span>
            <div className="status">
                <span className={userState}>{userState}</span>
            </div>
            <div className="options">
                <FontAwesomeIcon
                    className="icon"
                    icon={faEllipsisVertical}
                    onClick={handleMenu}
                />
            </div>
            {menu && <UserMenu />}
        </div>
    )
}
