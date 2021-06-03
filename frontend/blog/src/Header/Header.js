import React from 'react'
import "./Header.css"
function Header() {
    return (
        <div className="header">
            <div className="header__titles">
                <span className="header__titleSm">React & Node</span>
                <span className="header__titleLg">Blog</span>
            </div>
            <img className="header__img"src="https://dl.fujifilm-x.com/global/products/cameras/x-t3/sample-images/ff_x_t3_002.JPG"/>
            
        </div>
    )
}

export default Header
