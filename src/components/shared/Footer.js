import React from 'react'
import { BsFacebook } from 'react-icons/bs'
import { AiFillTwitterCircle, AiFillLinkedin , AiFillInstagram} from 'react-icons/ai'

const Footer = () => {
  return (
    <div>
      <footer className="footer flex flex-col justify-center items-center">
        <ul className="social-icon flex justify-center gap-4 text-2xl mb-2">
            <li>
              <a href="#">
                <BsFacebook></BsFacebook>
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillTwitterCircle></AiFillTwitterCircle>
              </a>
            </li>
            <li>
              <a  href="https://www.linkedin.com/in/aditya-battin-995414227/">
                <AiFillLinkedin></AiFillLinkedin>
              </a>
            </li>
            <li>
              <a href="#">
                <AiFillInstagram></AiFillInstagram>
              </a>
            </li>
        </ul>
        <p className='text-lg mb-5' >&copy;2023 Noise Tracker | All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default Footer
