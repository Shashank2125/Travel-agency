import React from 'react'
import {Header} from "../../../components";


const Dashboard = () => {
    const user={name:'Shashank'}
    return (
        <main className="dashboard wrapper">
            <Header
            title={`Welcome ${user?.name ?? 'Guest'} 👋`}
            description="Track activity, trends and popular destinantions in real time"
            />
            Dashboard Page Contents

        </main>
    )
}
export default Dashboard
