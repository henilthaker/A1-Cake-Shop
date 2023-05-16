import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <>
            <div id="footer">
                <div className="main-footer">

                    <div className="address">
                        <h1>A-one Cake Shop</h1>
                        <p>Address: A-one cake shop, Jogani Nagar,
                        Palanpur Patia, Surat, Gujarat 395009</p>
                    </div>

                    <div className="contactDetails">
                        <h1>Contact Us</h1>
                        <li>
                            <a href="tel:+919326048690"><div className="fa fa-phone"></div>+91 078743 32255</a>
                        </li>
                        <li>
                            <a href="mailto:a1cakesshop@gmail.com"><div className="fa fa-envelope"></div>a1cakeshop@gmail.com</a>
                        </li>
                    </div>
                    <div className="com">
                        <h1>Visit</h1>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/contact'>Contact-Us</Link></li>
                        </ul>
                    </div>
                    <div className="info">
                        <h1>Social Media</h1>
                        <div className="sociallogos">
                            <div className="logobox">
                                <a target="_blank" href="https://www.instagram.com/bakers_biscuit/?igshid=YmMyMTA2M2Y%3D" className="fa fa-instagram"></a>
                                <a href="https://wa.me/917016506608?text=Hello+A1+Bakery%0D%0AI+would+like+to+order+a+customised+cake+for+my+friend%27s+birthday." className="fa fa-whatsapp"></a>
                                <a href="https://www.facebook.com" className="fa fa-facebook"></a>
                                <a href="https://www.youtube.com/@a-onecakepastry" className="fa fa-youtube"></a>
                            </div>
                        </div>
                    </div>
                </div >
                <footer>©Copyright 2023 All Rights Reserved</footer>
            </div>
        </>
    )
}
export default Footer;