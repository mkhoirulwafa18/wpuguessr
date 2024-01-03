/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import Image from 'next/image';

// Define the Footer component
export default function Footer() {
    return (
        <footer className={"animate-fade-in absolute bottom-6 flex flex-col flex-wrap align-baseline justify-center w-full text-white "}>
            <div className='text-md text-center'>
                <span className="inline-flex pr-1">
                    All video credit goes to
                </span>
                <Link className="inline-flex underline" href="https://www.youtube.com/@tarik" target="_blank">
                    Tarik
                </Link>
            </div>
            <div className='text-md text-center'>
                <Link className="inline-flex pr-2" href="https://mkhoirulwafa18.github.io" target="_blank">
                    {`© ${new Date().getFullYear()} Muhammad Khoirul Wafa.`}
                </Link>
                <Link className="inline-flex underline" href="/humans.txt" target="_blank">
                    Crafted by yours truly
                </Link>
            </div>
            <div className='text-md text-center pt-2'>
                <Link className="inline-flex underline" href="https://www.buymeacoffee.com/wafastarz" target="_blank">
                    <img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=%E2%98%95&slug=wafastarz18&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff" />
                </Link>
            </div>
        </footer>
    );
}
