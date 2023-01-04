import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBriefcase,
    faChevronDown,
    faHouseChimney,
    faUserGroup,
    faUsers,
    faSackDollar,
    faHandshake,
    faPiggyBank,
    faHandHoldingUsd,
    faUserCheck,
    faUserXmark,
    faBuildingColumns,
    faCoins,
    faTaxi,
    faMobileScreen,
    faUserGear,
    faScroll,
    faChartColumn,
    faSliders,
    faCertificate,
    faClipboardList,
} from "@fortawesome/free-solid-svg-icons"

export default function DashboardNav() {
    return (
        <>
            <div className="nav-top">
                <FontAwesomeIcon icon={faBriefcase} />
                <span>Switch Organization</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faHouseChimney} />
                <span>Dashboard</span>
            </div>
            <h6>CUSTOMERS</h6>
            <div className="selected">
                <FontAwesomeIcon icon={faUserGroup} />
                <span>Users</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faUsers} />
                <span>Guarantors</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faSackDollar} />
                <span>Loans</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faHandshake} />
                <span>Decision Models</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faPiggyBank} />
                <span>Savings</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faHandHoldingUsd} />
                <span>Loan Requests</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faUserCheck} />
                <span>Whitelist</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faUserXmark} />
                <span>Karma</span>
            </div>
            {/* <div className="content">
                    </div> */}
            <h6>BUSINESSES</h6>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faBriefcase} />
                <span>Organization</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faHandHoldingUsd} />
                <span>Loan Products</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faBuildingColumns} />
                <span>Savings Products</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faCoins} />
                <span>Fees and Charges</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faMobileScreen} />
                <span>Transactions</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Services</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faUserGear} />
                <span>Service Account</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faScroll} />
                <span>Settlements</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faChartColumn} />
                <span>Reports</span>
            </div>
            <h6>SETTINGS</h6>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faSliders} />
                <span>Preferences</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faCertificate} />
                <span>Fees and Pricing</span>
            </div>
            <div className="nav-btn">
                <FontAwesomeIcon icon={faClipboardList} />
                <span>Audit Logs</span>
            </div>
        </>
    )
}
