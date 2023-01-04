import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons"
import {
    faArrowLeftLong,
    faChevronRight,
    faStar,
    faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import DashboardNav from "../components/DashboardNav"
import { RootState } from "../redux/store"
import { closeSidebar, UserProps } from "../redux/userReducer"
import "../styles/css/User.css"

export default function User() {
    const { sidebar } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const [usermenu, setUsermenu] = useState<boolean>(false)
    const [user, setUser] = useState<UserProps>()
    const { id } = useParams()
    const navigate = useNavigate()
    const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
    })

    useEffect(() => {
        axios
            .get(
                `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${id}`
            )
            .then((res) => {
                let value = res.data
                value = JSON.stringify(value)
                localStorage.setItem("user", value)
            })
            .then(() => {
                let value = localStorage.getItem("user") || ""
                let userData = JSON.parse(value)
                setUser(userData)
            })
    }, [id])

    const SideBar: FC = () => {
        return (
            <div className="sidebar">
                <div className="sidebar-head">
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="close-btn"
                        onClick={() => dispatch(closeSidebar())}
                    />
                </div>
                <div className="sidebar-cont">
                    <h3>Docs</h3>
                    <h3>Notifications</h3>
                    <h3>Profile</h3>
                </div>
            </div>
        )
    }

    function handleMenu() {
        if (!usermenu) setUsermenu(true)
        else setUsermenu(false)
    }

    return (
        <div className="User">
            {sidebar && <SideBar />}
            <div className="container">
                <div className="section1">
                    <DashboardNav />
                </div>
                <div className="section2">
                    <div className="content">
                        <div
                            className="go-back"
                            onClick={() => navigate("/dashboard")}
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                            <span>Back to Users</span>
                        </div>

                        <div className="header">
                            <h1>User Details</h1>
                            <div className="head-actions">
                                <button className="blacklist">
                                    BLACKLIST USER
                                </button>
                                <button className="activate">
                                    ACTIVATE USER
                                </button>
                            </div>
                        </div>

                        <div className="user-head">
                            <div className="user-head-cont">
                                <div className="head-info">
                                    <div className="name">
                                        <img
                                            src={user?.profile.avatar}
                                            className="img-cont"
                                            alt="user-icon"
                                        />
                                        <div className="name-id">
                                            <h2>
                                                {user?.profile.firstName}{" "}
                                                {user?.profile.lastName}
                                            </h2>
                                            <span>{user?.profile.bvn}</span>
                                        </div>
                                    </div>

                                    <div className="tier">
                                        <span>User's Tier</span>
                                        <div>
                                            <FontAwesomeIcon icon={faStar} />
                                            <FontAwesomeIcon
                                                icon={faStarRegular}
                                            />
                                            <FontAwesomeIcon
                                                icon={faStarRegular}
                                            />
                                        </div>
                                    </div>

                                    <div className="balance">
                                        <h2>
                                            {user?.profile.currency}
                                            {formatter.format(
                                                Number(user?.accountBalance)
                                            )}
                                        </h2>
                                        <span>
                                            {user?.accountNumber}/
                                            {user?.orgName}
                                        </span>
                                    </div>
                                </div>
                                <div className="user-menu">
                                    <h3 className="selected">
                                        General Details
                                    </h3>
                                    <h3>Documents</h3>
                                    <h3>Bank Details</h3>
                                    <h3>Loans</h3>
                                    <h3>Savings</h3>
                                    <h3>App and system</h3>
                                </div>
                                <div
                                    className="user-menu-responsive"
                                    onClick={handleMenu}
                                >
                                    <span>Menu</span>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                                {usermenu && (
                                    <div className="responsive-menu">
                                        <span className="selected">
                                            General Details
                                        </span>
                                        <span>Documents</span>
                                        <span>Bank Details</span>
                                        <span>Loans</span>
                                        <span>Savings</span>
                                        <span>App and system</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="user-info">
                            <div className="user-info-cont">
                                <div className="item">
                                    <h2>Personal Information</h2>
                                    <div className="item-info">
                                        <div className="info">
                                            <span>FULL NAME</span>
                                            <p>
                                                {user?.profile.firstName}{" "}
                                                {user?.profile.lastName}
                                            </p>
                                        </div>
                                        <div className="info">
                                            <span>PHONE NUMBER</span>
                                            <p>{user?.phoneNumber}</p>
                                        </div>
                                        <div className="info">
                                            <span>EMAIL</span>
                                            <p>{user?.email}</p>
                                        </div>
                                        <div className="info">
                                            <span>BVN</span>
                                            <p>{user?.profile.bvn}</p>
                                        </div>
                                        <div className="info">
                                            <span>GENDER</span>
                                            <p>{user?.profile.gender}</p>
                                        </div>
                                        <div className="info">
                                            <span>MARITAL STATUS</span>
                                            <p>Single</p>
                                        </div>
                                        <div className="info">
                                            <span>CHILDREN</span>
                                            <p>None</p>
                                        </div>
                                        <div className="info">
                                            <span>TYPE OF RESIDENCE</span>
                                            <p>PARENT'S APARTMENT</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <h2>Education and Employment</h2>
                                    <div className="item-info">
                                        <div className="info">
                                            <span>LEVEL OF EDUCATION</span>
                                            <p>{user?.education.level}</p>
                                        </div>
                                        <div className="info">
                                            <span>EMPLOYMENT STATUS</span>
                                            <p>
                                                {
                                                    user?.education
                                                        .employmentStatus
                                                }
                                            </p>
                                        </div>
                                        <div className="info">
                                            <span>SECTOR OF EMPLOYMENT</span>
                                            <p>{user?.education.sector}</p>
                                        </div>
                                        <div className="info">
                                            <span>DURATION OF EMPLOYMENT</span>
                                            <p>{user?.education.duration}</p>
                                        </div>
                                        <div className="info">
                                            <span>OFFICE EMAIL</span>
                                            <p>{user?.education.officeEmail}</p>
                                        </div>
                                        <div className="info">
                                            <span>MONTHLY INCOME</span>
                                            <p>
                                                {`${user?.profile.currency} ${user?.education.monthlyIncome[1]}`}{" "}
                                                -{" "}
                                                {`${user?.profile.currency} ${user?.education.monthlyIncome[0]}`}
                                            </p>
                                        </div>
                                        <div className="info">
                                            <span>LOAN REPAYMENT</span>
                                            <p>
                                                {user?.education.loanRepayment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <h2>Socials</h2>
                                    <div className="item-info">
                                        <div className="info">
                                            <span>TWITTER</span>
                                            <p>{user?.socials.twitter}</p>
                                        </div>
                                        <div className="info">
                                            <span>FACEBOOK</span>
                                            <p>{user?.socials.facebook}</p>
                                        </div>
                                        <div className="info">
                                            <span>INSTAGRAM</span>
                                            <p>{user?.socials.instagram}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <h2>Guarantor</h2>
                                    <div className="item-info">
                                        <div className="info">
                                            <span>FULL NAME</span>
                                            <p>{`${user?.guarantor.firstName} ${user?.guarantor.lastName}`}</p>
                                        </div>
                                        <div className="info">
                                            <span>PHONE NUMBER</span>
                                            <p>{user?.guarantor.phoneNumber}</p>
                                        </div>
                                        <div className="info">
                                            <span>EMAIL</span>
                                            <p>debby@gmail.com</p>
                                        </div>
                                        <div className="info">
                                            <span>RELATIONSHIP</span>
                                            <p>Sister</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
