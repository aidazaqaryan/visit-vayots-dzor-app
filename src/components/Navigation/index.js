import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

const Navigation = ({
    routes,
    nav,
}) => {
    return (
        <nav 
            className={styles.nav}
            data-open={nav.open}>
                <ul>
                    {routes.map(route => (
                        <li key={`nav-${route.path}`}>
                            <Link to={route.path}>
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>
        </nav>
    )
}

export default Navigation