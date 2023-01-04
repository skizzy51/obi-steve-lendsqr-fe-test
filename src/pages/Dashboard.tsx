import {
    faChevronLeft,
    faChevronRight,
    faTimes,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DashboardNav from "../components/DashboardNav"
import DashboardUser from "../components/DashboardUser"
import { RootState } from "../redux/store"
import { closeSidebar, UserProps } from "../redux/userReducer"
import "../styles/css/Dashboard.css"

export default function Dashboard() {
    const [filterModal, setFilterModal] = useState<boolean>(false)
    const [listNumber, setListNumber] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [pagesArray, setPagesArray] = useState<number[]>([1, 2, 3])
    const [filterList, setfilterList] = useState<any[]>([])
    const [orgList, setOrgList] = useState<string[]>([])
    const [orgSelect, setOrgSelect] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [dateInput, setDateInput] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const { sidebar, users } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const filterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document
            .getElementById("body-2")
            ?.addEventListener("click", handleClick)
    }, [])

    useEffect(() => {
        createFilteredList(users, listNumber)
        function getOrgName() {
            let dummyArray: string[] = []
            users?.forEach((user) => {
                if (!dummyArray.includes(user.orgName)) {
                    dummyArray.push(user.orgName)
                }
            })
            setOrgList(dummyArray)
        }
        getOrgName()
    }, [users, listNumber])

    function createFilteredList(users: UserProps[], listNumber: number) {
        setfilterList([])
        let dummyArray: UserProps[] = []
        let dummyFilterArray: any[] = []
        let num = 0

        for (let i = 0; i <= users.length; i++) {
            if (num < listNumber) {
                dummyArray.push(users[i])
                num++
            } else {
                dummyFilterArray.push(dummyArray)
                dummyArray = []
                dummyArray.push(users[i])
                num = 1
            }
        }
        setfilterList(dummyFilterArray)
    }

    function handleClick(e: any) {
        if (!filterRef.current?.contains(e.target)) {
            setFilterModal(false)
        }
    }

    function OpenFilterModal() {
        if (!filterModal) setFilterModal(true)
    }

    function handleSelectChange(e: any) {
        if (Number(e.target.value / 10) <= filterList.length)
            setListNumber(Number(e.target.value))
    }

    function filterSearch() {
        if (
            username.length > 2 ||
            orgSelect.length > 2 ||
            email.length > 2 ||
            dateInput.length > 2 ||
            phoneNumber.length > 2
        ) {
            let dummyArray: UserProps[] = []
            users.forEach((user) => {
                const date = new Date(user.createdAt)
                if (username.length > 2) {
                    if (
                        user.userName
                            .toLowerCase()
                            .includes(username.toLowerCase())
                    )
                        dummyArray.push(user)
                } else if (orgSelect.length > 2) {
                    if (
                        user.orgName
                            .toLowerCase()
                            .includes(orgSelect.toLowerCase())
                    )
                        dummyArray.push(user)
                } else if (email.length > 2) {
                    if (user.email.toLowerCase().includes(email.toLowerCase()))
                        dummyArray.push(user)
                } else if (dateInput.length > 2) {
                    if (
                        date
                            .toDateString()
                            .toLowerCase()
                            .includes(dateInput.toLowerCase())
                    )
                        dummyArray.push(user)
                } else if (phoneNumber.length > 2) {
                    if (
                        user.phoneNumber
                            .toLowerCase()
                            .includes(phoneNumber.toLowerCase())
                    )
                        dummyArray.push(user)
                }
            })
            if (dummyArray.length > 0) {
                createFilteredList(dummyArray, dummyArray.length)
            } else alert("No users match your search")
        } else
            alert(
                "There should at least be 3 values provided for any of the filter inputs"
            )
        setFilterModal(false)
    }

    function filterReset() {
        createFilteredList(users, listNumber)
        setFilterModal(false)
        setListNumber(10)
        setOrgSelect("")
        setUsername("")
        setEmail("")
        setDateInput("")
        setPhoneNumber("")
    }

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

    const Pagination: FC = () => {
        if (filterList.length < 6) {
            return (
                <div className="pagination">
                    <FontAwesomeIcon
                        className="paginator"
                        icon={faChevronLeft}
                        onClick={() => {
                            if (page > 1) {
                                setPage((page) => page - 1)
                            }
                        }}
                    />
                    {filterList.map((item) => {
                        return (
                            <span
                                style={
                                    page === filterList.indexOf(item) + 1
                                        ? { opacity: 1 }
                                        : {}
                                }
                                key={filterList.indexOf(item)}
                            >
                                {filterList.indexOf(item) + 1}
                            </span>
                        )
                    })}
                    <FontAwesomeIcon
                        className="paginator"
                        icon={faChevronRight}
                        onClick={() => {
                            if (page < filterList.length) {
                                setPage((page) => page + 1)
                            }
                        }}
                    />
                </div>
            )
        } else {
            return (
                <div className="pagination">
                    <FontAwesomeIcon
                        className="paginator"
                        icon={faChevronLeft}
                        onClick={() => {
                            let dummyArray = pagesArray
                            if (page > 1) {
                                setPage((page) => page - 1)
                                if (page < filterList.length - 3) {
                                    dummyArray.pop()
                                    dummyArray.unshift(dummyArray[0] - 1)
                                    setPagesArray(dummyArray)
                                }
                            }
                        }}
                    />
                    <span style={pagesArray[0] === page ? { opacity: 1 } : {}}>
                        {pagesArray[0]}
                    </span>
                    <span style={pagesArray[1] === page ? { opacity: 1 } : {}}>
                        {pagesArray[1]}
                    </span>
                    <span style={pagesArray[2] === page ? { opacity: 1 } : {}}>
                        {pagesArray[2]}
                    </span>
                    <span>...</span>
                    <span
                        style={
                            page === filterList.length - 1 ? { opacity: 1 } : {}
                        }
                    >
                        {filterList.length - 1}
                    </span>
                    <span
                        style={page === filterList.length ? { opacity: 1 } : {}}
                    >
                        {filterList.length}
                    </span>
                    <FontAwesomeIcon
                        className="paginator"
                        icon={faChevronRight}
                        onClick={() => {
                            let dummyArray = pagesArray
                            if (page < filterList.length) {
                                setPage((page) => page + 1)
                                if (page < filterList.length - 4) {
                                    dummyArray.shift()
                                    dummyArray.push(
                                        dummyArray[dummyArray.length - 1] + 1
                                    )
                                    setPagesArray(dummyArray)
                                }
                            }
                        }}
                    />
                </div>
            )
        }
    }

    const UserList = () => {
        return (
            <>
                {filterList[page - 1]?.map((user: UserProps) => {
                    return <DashboardUser key={user.id} {...user} />
                })}
            </>
        )
    }

    return (
        <div className="Dashboard">
            {sidebar && <SideBar />}
            <div className="container">
                <div className="section1">
                    <DashboardNav />
                </div>
                <div className="section2">
                    <div className="content">
                        <h1 className="head">Users</h1>

                        <div className="hero">
                            <div className="item-cont">
                                <div className="item">
                                    <img src="/users.svg" alt="hero-icon" />
                                    <span>USERS</span>
                                    <h2>2,453</h2>
                                </div>
                            </div>
                            <div className="item-cont">
                                <div className="item">
                                    <img
                                        src="/user-active.svg"
                                        alt="hero-icon"
                                    />
                                    <span>ACTIVE USERS</span>
                                    <h2>2,453</h2>
                                </div>
                            </div>
                            <div className="item-cont">
                                <div className="item">
                                    <img
                                        src="/user-loans.svg"
                                        alt="hero-icon"
                                    />
                                    <span>USERS WITH LOANS</span>
                                    <h2>12,453</h2>
                                </div>
                            </div>
                            <div className="item-cont">
                                <div className="item">
                                    <img
                                        src="/user-savings.svg"
                                        alt="hero-icon"
                                    />
                                    <span>USERS WITH SAVINGS</span>
                                    <h2>102,453</h2>
                                </div>
                            </div>
                        </div>

                        <div className="main">
                            <div className="main-container">
                                {filterModal && (
                                    <div
                                        ref={filterRef}
                                        className="filter-popup"
                                    >
                                        <div className="filter-content">
                                            <div className="filter-control">
                                                <label>Organization</label>
                                                <select
                                                    onChange={(e) =>
                                                        setOrgSelect(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        None
                                                    </option>
                                                    {orgList.map((org) => (
                                                        <option key={org}>
                                                            {org}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="filter-control">
                                                <label>Username</label>
                                                <input
                                                    type="text"
                                                    placeholder="User"
                                                    onChange={(e) =>
                                                        setUsername(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="filter-control">
                                                <label>Email</label>
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="filter-control">
                                                <label>Date</label>
                                                <input
                                                    type="date"
                                                    onChange={(e) => {
                                                        let date = new Date(
                                                            e.target.value
                                                        )
                                                        setDateInput(
                                                            date.toDateString()
                                                        )
                                                    }}
                                                />
                                            </div>
                                            <div className="filter-control">
                                                <label>Phone Number</label>
                                                <input
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    onChange={(e) =>
                                                        setPhoneNumber(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="filter-control">
                                                <label>Status</label>
                                                <select></select>
                                            </div>
                                            <div className="reset-filter">
                                                <button
                                                    className="reset"
                                                    onClick={filterReset}
                                                >
                                                    Reset
                                                </button>
                                                <button
                                                    className="filter"
                                                    onClick={filterSearch}
                                                >
                                                    Filter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="main-head">
                                    <div>
                                        <h5>ORGANIZATION</h5>
                                        <img
                                            src="/filter-bars.svg"
                                            alt="filter"
                                            onClick={OpenFilterModal}
                                        />
                                    </div>
                                    <div>
                                        <h5>USERNAME</h5>
                                        <img
                                            src="/filter-bars.svg"
                                            alt="filter"
                                            onClick={OpenFilterModal}
                                        />
                                    </div>
                                    <div>
                                        <h5>EMAIL</h5>
                                        <img
                                            src="/filter-bars.svg"
                                            alt="filter"
                                            onClick={OpenFilterModal}
                                        />
                                    </div>
                                    <div>
                                        <h5>PHONE NUMBER</h5>
                                        <img
                                            src="/filter-bars.svg"
                                            alt="filter"
                                            onClick={OpenFilterModal}
                                        />
                                    </div>
                                    <div>
                                        <h5>DATE JOINED</h5>
                                        <img
                                            src="/filter-bars.svg"
                                            alt="filter"
                                            onClick={OpenFilterModal}
                                        />
                                    </div>
                                    <div>
                                        <h5>STATUS</h5>
                                        <img
                                            src="/filter-bars.svg"
                                            alt="filter"
                                            onClick={OpenFilterModal}
                                        />
                                    </div>
                                    <div></div>
                                </div>
                                <div className="main-content">
                                    <UserList />
                                </div>
                            </div>
                        </div>

                        <div className="user-control">
                            <div className="page-amount">
                                <span>Showing</span>
                                {filterList.length <= 1 ? (
                                    <span>{filterList.length}</span>
                                ) : (
                                    <select onChange={handleSelectChange}>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>50</option>
                                    </select>
                                )}
                                <span>out of {users.length}</span>
                            </div>

                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
