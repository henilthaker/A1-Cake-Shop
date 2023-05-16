const ContactUs = () => {
    return (
        <>
            <div className="contact">
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.710943553475!2d72.78736871493565!3d21.20363878590386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04de609b4312f%3A0x64589139d6700981!2sA-one%20cake%20shop!5e0!3m2!1sen!2sin!4v1673963619266!5m2!1sen!2sin"
                        id="map-id"></iframe>
                </div>
                <div className="contact-details">
                    <h2>Contact Information</h2>
                    <ul className="generalContact">
                        <li> <i className="fa fa-phone"></i> 078743 32255, +91 70432 66781</li>
                        <li><i className="fa fa-whatsapp"></i>+91 70432 66781</li>
                        <li><i className="fa fa-envelope"></i> a1bakery@gmail.com</li>
                        <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                            A-one cake shop, Jogani Nagar, Palanpur Patia, Surat,
                            Gujarat 395009</li>
                    </ul >
                    <ul className="social">
                        <li><a href="https://www.instagram.com/bakers_biscuit/?igshid=YmMyMTA2M2Y%3D" target="_blank"><i className="fa fa-instagram"></i></a></li>
                        <li>
                            <a href=""><i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a href=""><i className="fa fa-twitter"></i></a>
                        </li>
                    </ul>
                </div >
            </div >
        </>
    )
}
export default ContactUs;